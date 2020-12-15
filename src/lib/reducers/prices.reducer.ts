import { PriceActions, UPDATE_BTC_SPOT } from "../types";
import { PriceData, createDefault } from "../entities/priceData";

export const initialState: PriceData = createDefault();

const priceReducer = (state: PriceData = initialState, action: PriceActions): PriceData => {
    switch (action.type) {
        case UPDATE_BTC_SPOT:
            return { ...state, price: action.price, lastUpdated: Date.now() };
        default:
            return state;
    }
};

export default priceReducer;
