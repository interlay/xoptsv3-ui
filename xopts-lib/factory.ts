import { Optional } from "../src/lib/types";
import { ethers, Signer } from "ethers";
import { DefaultXOpts, XOpts } from "./xopts";
import { getAddresses } from "./addresses";

export async function createXOpts(
    provider: Optional<ethers.providers.Provider>,
    signer: Optional<Signer> = null
): Promise<XOpts> {
    if (!provider) {
        throw new Error("No provider for XOpts!");
    }
    const network = await provider.getNetwork();
    const addresses = getAddresses(network);
    return new DefaultXOpts(addresses, provider, signer);
}
