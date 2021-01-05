import { XOpts } from "../../xopts-lib";
import { Optional } from "./types";

/*
 * EphemeralStore should be used to objects that are only valid
 * during a single session, such as persistent connections,
 * and that do not belong in Redux's store
 * For anything that needs to be persisted across sessions,
 * such as the user address, Redux's store should be used
 */
class EphemeralStore {
    private _xopts: Optional<XOpts> = null;

    get xopts(): Optional<XOpts> {
        return this._xopts;
    }

    set xopts(xopts: Optional<XOpts>) {
        this._xopts = xopts;
    }
}

export default new EphemeralStore();
