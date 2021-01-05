import { Dispatch } from "react";
import { updateBTCSpotPriceAction } from "../lib/actions";
import { PriceActions } from "../lib/types/index";
import { Option } from "../../xopts-lib/models/option";

export const updateBTCSpotPrice = async (dispatch: Dispatch<PriceActions>): Promise<void> => {
    const mockRandom = Math.random() * 100 - 50;
    const newPrice: number = await new Promise((resolve) =>
        setTimeout(() => resolve(10500 + mockRandom), 500)
    );
    dispatch(updateBTCSpotPriceAction(newPrice));
};

export const encodeOptionData = (optionData: Option): string => {
    const serialised = Object.entries(optionData).reduce(
        (acc, [, val]) => acc + val.toString(),
        ""
    );
    console.log("Option: ", optionData);
    console.log("Serialised option: ", serialised);
    console.log("base64 option: ", btoa(serialised));
    return serialised;
};

export const getOptionLink = (serialisedOption: string): string => {
    return `${process.env.domain}/claim/${serialisedOption}`;
};

export const hoursToMs = (hours: number): number => hours * 3600 * 1000;
export const daysToMs = (days: number): number => days * 86400 * 1000;

export const formatDatePretty = (date: number): string => new Date(date).toLocaleString();
