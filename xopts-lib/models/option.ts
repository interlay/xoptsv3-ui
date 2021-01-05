export type OptionType = "European" | "American";

export type Option = {
    id?: number;
    size: string;
    underlying: string;
    strikePrice: string;
    collateral: string;
    optionType: OptionType;
    expiry: number;
    premium: string;
    sellerBTCAddress: string;
    validityWindow: number;
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
            optionType: "American",
            expiry: Date.now(),
            premium: "",
            sellerBTCAddress: "",
            validityWindow: 0,
            recipientWhitelist: "",
        },
        overrides
    );
}
