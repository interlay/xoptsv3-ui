import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import positionReducer from "./position.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    positions: positionReducer,
});
