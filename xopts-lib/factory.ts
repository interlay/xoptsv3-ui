import { Optional } from "../src/lib/types";
import { MockXOpts } from "./mock";
import { ethers, Signer } from "ethers";
import { DefaultXOpts, XOpts } from "./xopts";
import { getAddresses } from "./addresses";

export async function createXOpts(
    provider: Optional<ethers.providers.Provider>,
    signer: Optional<Signer> = null
): Promise<XOpts> {
    if (!provider) {
        return new MockXOpts();
    }
    const network = await provider.getNetwork();
    const addresses = getAddresses(network);
    return new DefaultXOpts(addresses, provider, signer);
}
