export type OptionType = "european" | "american";

export type Option = {
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

export function createDefault(): Option {
    return {
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
    };
}
