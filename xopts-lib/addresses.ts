import { ethers } from "ethers";

export interface Addresses {
    storage: string;
    collaterals: {
        USDT: string;
        DAI: string;
    };
}

export const HardhatAddresses: Addresses = {
    storage: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    collaterals: {
        USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
};

enum Networks {
    Mainnet = 1,
    Ropsten = 3,
    Hardhat = 1337,
}

export function getAddresses(network: ethers.providers.Network): Addresses {
    switch (network.chainId) {
        case Networks.Mainnet:
            throw new Error("mainnet not yet supported");
        case Networks.Ropsten:
            throw new Error("ropsten coming soon™");
        case Networks.Hardhat:
            return HardhatAddresses;
        default:
            throw new Error(`unknown chain ID ${network.chainId}`);
    }
}
