import {
    UpdateIsUserConnected,
    UpdateUserData,
    UpdateUserNetwork,
    UPDATE_IS_USER_CONNECTED,
    UPDATE_USER_DATA,
    UPDATE_USER_NETWORK,
} from "../types";

export const updateIsUserConnectedAction = (isConnected: boolean, account?: string): UpdateIsUserConnected => ({
    type: UPDATE_IS_USER_CONNECTED,
    isConnected,
    account,
});

export const updateUserNetworkAction = (network: string): UpdateUserNetwork => ({
    type: UPDATE_USER_NETWORK,
    network,
});

export const updateUserDataAction = (
    btcAddress: string,
    email: string,
    hour: boolean,
    day: boolean,
    threedays: boolean,
    confirmed: boolean
): UpdateUserData => ({
    type: UPDATE_USER_DATA,
    btcAddress,
    email,
    hour,
    day,
    threedays,
    confirmed,
});
