import { Position } from "./models";

export interface XOpts {
    loadPositions(user: string): Promise<Position[]>;
}

export class DefaultXOpts implements XOpts {
    loadPositions(_user: string): Promise<Position[]> {
        throw new Error("not implemented");
    }
}
