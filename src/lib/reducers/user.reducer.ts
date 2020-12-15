import { UserActions, UPDATE_USER_NETWORK, UPDATE_USER_DATA } from "../types";
import { User, createDefault } from "../entities/user";
import { UPDATE_IS_USER_CONNECTED } from "../types";

export const initialState: User = createDefault();

const userReducer = (state: User = initialState, action: UserActions): User => {
    switch (action.type) {
    case UPDATE_IS_USER_CONNECTED:
        return { ...state, isConnected: action.isConnected, account: action.account };
    case UPDATE_USER_NETWORK:
        return { ...state, network: action.network };
    case UPDATE_USER_DATA:
        return {
            ...state,
            btcAddress: action.btcAddress,
            email: action.email,
            notifications: {
                hour: action.hour,
                day: action.day,
                threedays: action.threedays,
                confirmed: action.confirmed,
            },
        };
    default:
        return state;
    }
};

export default userReducer;
