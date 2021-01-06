import { Option } from "./option";

export interface Position {
    /**
     * The underlying option of this position
     */
    option: Option;

    /**
     * Whether it's a sold (written) or bought (executed) option
     */
    written: boolean;

    /**
     * Buyer of the option (if the option is sell-type, and has been bought
     */

    buyerColAddress: string;
}
