export type OptionType = "european" | "american";

export type Option = {
    id?: string;
    size: string;
    underlying: string;
    strikePrice: string;
    collateral: string;
    optionType: OptionType;
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
            size: "",
            underlying: "BTC",
            strikePrice: "",
            collateral: "USDT",
            optionType: "american",
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
