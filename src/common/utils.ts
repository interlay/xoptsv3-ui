import { Dispatch } from "react";
import { updateBTCSpotPriceAction } from "../lib/actions";
import { PriceActions } from "../lib/types/index";

export const updateBTCSpotPrice = async (
    dispatch: Dispatch<PriceActions>,
    underlying: string,
    collateral: string
): Promise<void> => {
    const newPrice: number = await fetch(
        // eslint-disable-next-line max-len
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${underlying}&tsyms=${collateral}&api_key=0fe74ac7dd16554406f7ec8d305807596571e13bd6b3c8ac496ac436c17c26e2`
    )
        .then((res) => res.json())
        .then((result) => result.BTC[collateral]);
    dispatch(updateBTCSpotPriceAction(newPrice));
};

export const getOptionLink = (serialisedOption: string): string => {
    return `${process.env.domain}/claim/${serialisedOption}`;
};

export const hoursToMs = (hours: number): number => hours * 3600 * 1000;
export const daysToMs = (days: number): number => days * 86400 * 1000;

export const formatDatePretty = (date: number): string => new Date(date).toLocaleString();
