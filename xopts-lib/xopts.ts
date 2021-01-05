import { OptionStorage } from "@interlay/xoptsv3-contracts";
// eslint-disable-next-line max-len
import OptionStorageArtifact from "@interlay/xoptsv3-contracts/artifacts/contracts/OptionStorage.sol/OptionStorage.json";
import { Contract, providers, Signer, utils } from "ethers";
import { Optional } from "../src/lib/types";
import { Addresses } from "./addresses";
import { nullAddress } from "./constants";
import { Option, Position } from "./models";

export interface XOpts {
    loadPositions(): Promise<Position[]>;
    saveOption(option: Option): Promise<string>;
    loadOption(optionId: string): Promise<Option>;
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
        const contractOptions = await this.optionStorage.listOptions(signerAddress);
        console.log(contractOptions);
        // TODO: convert this into positions
        return Promise.resolve([]);
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

        const contractOption = {
            collateral: collateralAddress,
            premium: option.premium,
            sellerBTCAddress: option.sellerBTCAddress,
            recipientWhitelist: [signerAddress],
            expiry: option.expiry,
            underlying: utils.formatBytes32String(option.underlying),
            european: option.optionType === "european",
            strikePrice: option.strikePrice,
            offerExpiry: option.offerExpiry,
            size: option.size,
            executedBy: nullAddress, // will be overwritten
            exercised: false, // will be overwritten
            id: "0x" + "0".repeat(64), // will be overwritten
            writer: nullAddress, // will be overwritten
        };
        console.log("creating", contractOption);

        const tx = await this.optionStorage.storeOption(contractOption);
        const receipt = await tx.wait();
        const events = receipt.events;
        if (events && events[0]?.args?.id) {
            return events[0].args.id;
        }
        throw new Error("failed to create option");
    }

    async loadOption(optionId: string): Promise<Option> {
        console.log("GETTING OPTION", optionId);
        const opt = await this.optionStorage.getOption(optionId.toString());
        console.log(opt);
        return Promise.resolve({
            id: opt.id,
            size: opt.size.toString(),
            underlying: utils.parseBytes32String(opt.underlying),
            strikePrice: opt.strikePrice.toString(),
            collateral: Object.fromEntries(
                Object.entries(this.addresses.collaterals).map(([col, add]) => [add, col])
            )[opt.collateral.toString().toLowerCase()],
            optionType: opt.european ? "european" : "american",
            expiry: opt.expiry.toNumber(),
            premium: opt.premium.toString(),
            sellerBTCAddress: opt.sellerBTCAddress,
            sellerColAddress: opt.writer,
            offerExpiry: opt.offerExpiry.toNumber(),
            recipientWhitelist: opt.recipientWhitelist.toString(),
        });
    }
}
