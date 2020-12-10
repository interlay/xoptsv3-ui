export const UPDATE_IS_USER_CONNECTED = "UPDATE_IS_USER_CONNECTED";
export const UPDATE_USER_NETWORK = "UPDATE_USER_NETWORK";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export interface UpdateIsUserConnected {
    type: typeof UPDATE_IS_USER_CONNECTED;
    isConnected: boolean;
    account?: string;
}

export interface UpdateUserNetwork {
    type: typeof UPDATE_USER_NETWORK;
    network: string;
}

export interface UpdateUserData {
    type: typeof UPDATE_USER_DATA;
    btcAddress: string;
    email: string;
    hour: boolean;
    day: boolean;
    threedays: boolean;
    confirmed: boolean;
}

export type UserActions = UpdateIsUserConnected | UpdateUserNetwork | UpdateUserData;
