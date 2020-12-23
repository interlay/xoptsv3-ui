import { MockXOpts } from "./mock";
import { XOpts } from "./xopts";

export async function createXOpts(network?: string): Promise<XOpts> {
    if (network === "mock") {
        return new MockXOpts();
    }
    throw new Error("only implemented for mock");
}
