export type OptionType = "European" | "American";

export type Option = {
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

export function createDefault(): Option {
    return {
        size: "",
        underlying: "BTC",
        strikePrice: "",
        collateral: "USDT",
        optionType: "American",
        expiry: 0,
        premium: "",
        sellerBTCAddress: "",
        validityWindow: 0,
        recipientWhitelist: "",
    };
}
