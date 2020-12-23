import { useEffect, useState } from "react";
import { createXOpts, XOpts } from "../../../xopts-lib";
import { Optional } from "../types";
import { useEthers } from "./use-ethers";

let _xopts: XOpts;

// TODO: read this from config
const XOPTS_NETWORK = "mock";

export function useXOpts(): Optional<XOpts> {
    const [xopts, setXOpts] = useState<Optional<XOpts>>(null);
    const provider = useEthers();

    useEffect(() => {
        if (xopts) {
            return;
        }
        if (_xopts) {
            setXOpts(_xopts);
            return;
        }
        if (!provider) {
            return;
        }
        createXOpts(XOPTS_NETWORK).then((res) => {
            _xopts = res;
            setXOpts(_xopts);
        });
    }, [provider]);

    return xopts;
}
