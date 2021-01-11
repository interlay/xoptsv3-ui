export type OptionType = "european" | "american";

export type Option = {
    id: string;
    size: string;
    underlying: string;
    strikePrice: string;
    collateral: string;
    optionType: OptionType;
    put: boolean;
    expiry: number;
    premium: string;
    sellerBTCAddress: string;
    sellerColAddress: string;
    offerExpiry: number;
    recipientWhitelist: string;
};

type PartialOption = Partial<Option>;

export function createDefault(overrides: PartialOption = {}): Option {
    return Object.assign(
        {
            id: "0x" + "0".repeat(64),
            size: "",
            underlying: "BTC",
            strikePrice: "",
            collateral: "USDT",
            optionType: "european",
            put: true,
            expiry: Date.now(),
            premium: "",
            sellerBTCAddress: "",
            sellerColAddress: "",
            offerExpiry: Date.now(),
            recipientWhitelist: "",
        },
        overrides
    );
}
