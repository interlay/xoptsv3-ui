export interface PriceData {
    price: number;
    lastUpdated: number;
}

export function createDefault(): PriceData {
    return {
        price: 0,
        lastUpdated: 0,
    };
}
