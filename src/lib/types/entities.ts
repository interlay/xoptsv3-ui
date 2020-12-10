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
