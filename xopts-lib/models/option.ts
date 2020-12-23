// TODO: merge with PR
export type OptionType = "European" | "American";

// TODO: use fixed point representation for numerical values
export type Option = {
    size: number;
    address: string;
    underlying: string;
    collateral: string;
    strikePrice: number;
    optionType: OptionType;
    expiry: number;
    // premium: string;
    sellerBTCAddress: string;
    validityWindow: number;
    // recipientWhitelist: string;
};
