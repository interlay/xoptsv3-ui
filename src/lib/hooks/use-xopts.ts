import { useEffect, useState } from "react";
import { createXOpts, XOpts } from "../../../xopts-lib";
import { Optional } from "../types";
import { useEthers } from "./use-ethers";
import ephemeralStore from "../ephemeral-store";

export function useXOpts(): Optional<XOpts> {
    const [xopts, setXOpts] = useState<Optional<XOpts>>(ephemeralStore.xopts);
    const provider = useEthers();

    useEffect(() => {
        if (xopts) {
            return;
        }
        if (ephemeralStore.xopts) {
            setXOpts(ephemeralStore.xopts);
            return;
        }
        if (!provider) {
            return;
        }
        const xoptsPromise = process.env.useMock
            ? createXOpts(null)
            : createXOpts(provider, provider.getSigner());
        xoptsPromise.then((res) => {
            ephemeralStore.xopts = res;
            setXOpts(ephemeralStore.xopts);
        });
    }, [provider]);

    return xopts;
}
