import Big from "big.js";

export enum OptionType {
    European,
    American,
}

export type Option = {
    size: {
        amount: Big;
        currency: string;
    };
    strike: {
        strikePrice: Big;
        currency: string;
    };
    optionType: OptionType;
    expiry: number;
    premium: Big;
    sellerBTCAddress: string;
    validityWindow: number;
    recipientWhitelist: string;
};
