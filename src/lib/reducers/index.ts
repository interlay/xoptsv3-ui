import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import positionReducer from "./position.reducer";
import priceReducer from "./prices.reducer";
import optionReducer from "./option.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    positions: positionReducer,
    prices: priceReducer,
    options: optionReducer,
});
