export interface User {
    isConnected: boolean;
    network: string;
    account?: string;
    btcAddress: string;
    email: string;
    notifications: {
        hour: boolean;
        day: boolean;
        threedays: boolean;
        confirmed: boolean;
    };
}

export function createDefault(): User {
    return {
        isConnected: false,
        account: undefined,
        network: "",
        btcAddress: "",
        email: "",
        notifications: { hour: false, day: false, threedays: false, confirmed: false },
    };
}
