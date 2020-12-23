import { Position } from "../models";
import { XOpts } from "../xopts";

import { positions } from "./db";

export class MockXOpts implements XOpts {
    async loadPositions(user: string): Promise<Position[]> {
        return positions.map((v) => {
            return { ...v, account: user };
        });
    }
}
