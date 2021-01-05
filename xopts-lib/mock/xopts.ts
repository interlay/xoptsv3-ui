import { Position, Option } from "../models";
import { XOpts } from "../xopts";

import { positions } from "./db";

export class MockXOpts implements XOpts {
    private options: Option[] = [];

    async saveOption(option: Option): Promise<number> {
        this.options.push(option);
        return this.options.length;
    }

    async loadPositions(): Promise<Position[]> {
        return positions.map((v) => {
            return { ...v };
        });
    }
}
