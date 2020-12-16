import { Dispatch } from "react";
import { updateBTCSpotPriceAction } from "../lib/actions";
import { PriceActions } from "../lib/types/index";
import { Option } from "../lib/types/option";

export const updateBTCSpotPrice = async (dispatch: Dispatch<PriceActions>): Promise<void> => {
    const mockRandom = Math.random() * 100 - 50;
    const newPrice: number = await new Promise((resolve) => setTimeout(() => resolve(10500 + mockRandom), 500));
    dispatch(updateBTCSpotPriceAction(newPrice));
};
