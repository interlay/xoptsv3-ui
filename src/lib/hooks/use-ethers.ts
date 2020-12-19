import { ethers } from "ethers";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { Optional } from "../types";

type Provider = ethers.providers.Web3Provider; // will we ever use anything other than Web3Provider?

export function useEthers(): Optional<Provider> {
    const [provider, setProvider] = useState<Optional<Provider>>(null);

    useEffect(() => {
        if (provider) {
            return;
        }
        detectEthereumProvider()
            .then((web3: any) => {
                setProvider(new ethers.providers.Web3Provider(web3));
            })
            .catch(console.error);
    });

    return provider;
}
