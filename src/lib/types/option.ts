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
