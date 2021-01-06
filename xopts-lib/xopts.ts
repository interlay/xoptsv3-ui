import { OptionStorage } from "@interlay/xoptsv3-contracts";
// eslint-disable-next-line max-len
import OptionStorageArtifact from "@interlay/xoptsv3-contracts/artifacts/contracts/OptionStorage.sol/OptionStorage.json";
import { BigNumber, Contract, providers, Signer, utils } from "ethers";
import { Optional } from "../src/lib/types";
import { Addresses } from "./addresses";
import { nullAddress } from "./constants";
import { Option, Position } from "./models";

//bootleg monetary lib
const decimals = {
    satoshi: 100000000,
    DAI: 1000000000, //gigadai. this is temp anyway and avoids a bignumber lib
    USDT: 1000000,
};

export interface XOpts {
    loadPositions(): Promise<Position[]>;
    saveOption(option: Option): Promise<string>;
    loadOption(optionId: string): Promise<Option>;
    executeOption(optionId: string): Promise<void>;
}

type ContractOption = {
    id: string;
    writer: string;
    collateral: string;
    expiry: BigNumber;
    european: boolean;
    premium: BigNumber;
    recipientWhitelist: string[];
    underlying: string;
    sellerBTCAddress: string;
    strikePrice: BigNumber;
    offerExpiry: BigNumber;
    size: BigNumber;
    executedBy: string;
    exercised: boolean;
};

function contractOptToLibOpt(opt: ContractOption, addresses: Addresses): Option {
    const collateral: "USDT" | "DAI" = Object.fromEntries(
        Object.entries(addresses.collaterals).map(([col, add]) => [add, col])
    )[opt.collateral.toString().toLowerCase()] as "USDT" | "DAI";

    return {
        id: opt.id,
        size: (opt.size.toNumber() / decimals.satoshi).toString(),
        underlying: utils.parseBytes32String(opt.underlying),
        strikePrice: (opt.strikePrice.toNumber() / decimals[collateral]).toString(),
        collateral: collateral,
        optionType: opt.european ? "european" : "american",
        expiry: opt.expiry.toNumber(),
        premium: (opt.premium.toNumber() / decimals[collateral]).toString(),
        sellerBTCAddress: opt.sellerBTCAddress,
        sellerColAddress: opt.writer,
        offerExpiry: opt.offerExpiry.toNumber(),
        recipientWhitelist: opt.recipientWhitelist.toString(),
    };
}

export class DefaultXOpts implements XOpts {
    private optionStorage: OptionStorage;

    constructor(
        readonly addresses: Addresses,
        readonly provider: providers.Provider,
        readonly signer: Optional<Signer>
    ) {
        this.signer = signer;
        this.provider = provider;

        this.optionStorage = new Contract(
            addresses.storage,
            OptionStorageArtifact.abi,
            signer || provider
        ) as OptionStorage;
    }

    async loadPositions(): Promise<Position[]> {
        if (!this.signer) {
            return [];
        }
        const signerAddress = await this.signer.getAddress();
        const writtenOptions: ContractOption[] = await this.optionStorage.listWrittenOptions(
            signerAddress
        );
        const executedOptions: ContractOption[] = await this.optionStorage.listExecutedOptions(
            signerAddress
        );
        return Promise.resolve(
            writtenOptions
                .map((opt) => ({
                    option: contractOptToLibOpt(opt, this.addresses),
                    written: true,
                    buyerColAddress: opt.executedBy,
                }))
                .concat(
                    executedOptions.map((opt) => ({
                        written: false,
                        buyerColAddress: opt.executedBy,
                        option: contractOptToLibOpt(opt, this.addresses),
                    }))
                )
        );
    }

    async saveOption(option: Option): Promise<string> {
        if (!this.signer) {
            throw new Error("wallet not connected");
        }
        const signerAddress = await this.signer.getAddress();

        // FIXME: we should do this at the type level in `Option`
        if (!(option.collateral === "DAI" || option.collateral === "USDT")) {
            throw new Error(`invalid collateral ${option.collateral}`);
        }
        const collateralAddress = this.addresses.collaterals[option.collateral];

        //very dirty conversion
        const size = Number(option.size) * decimals.satoshi;
        const premium = Number(option.premium) * decimals[option.collateral];
        const strike = Number(option.strikePrice) * decimals[option.collateral];

        const contractOption = {
            collateral: collateralAddress,
            premium: premium,
            sellerBTCAddress: option.sellerBTCAddress,
            recipientWhitelist: [signerAddress],
            expiry: option.expiry,
            underlying: utils.formatBytes32String(option.underlying),
            european: option.optionType === "european",
            strikePrice: strike,
            offerExpiry: option.offerExpiry,
            size: size,
            executedBy: nullAddress, // will be overwritten
            exercised: false, // will be overwritten
            id: "0x" + "0".repeat(64), // will be overwritten
            writer: nullAddress, // will be overwritten
        };

        const tx = await this.optionStorage.storeOption(contractOption);
        const receipt = await tx.wait();
        const events = receipt.events;
        if (events && events[0]?.args?.id) {
            return events[0].args.id;
        }
        throw new Error("failed to create option");
    }

    async loadOption(optionId: string): Promise<Option> {
        const opt = await this.optionStorage.getOption(optionId.toString());

        return Promise.resolve(contractOptToLibOpt(opt, this.addresses));
    }

    async executeOption(optionId: string): Promise<void> {
        await this.optionStorage.executeOption(optionId);
    }
}
