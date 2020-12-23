import { Option } from "./option";

export interface Position {
    /**
     * The underlying option of this position
     */
    option: Option;

    /**
     * Account owning the position
     */
    account: string;

    /**
     * The total amount written for this position in terms of underlying asset
     */
    writtenAmount: number;

    /**
     * The total amount bought for this position in terms of underlying asset
     */
    boughtAmount: number;
}
