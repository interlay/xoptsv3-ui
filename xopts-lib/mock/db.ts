import mockDb from "./db.json";
import { Option, OptionType, Position } from "../models";

function loadMockOptions(): Option[] {
    return mockDb.options.map((v) => {
        return { ...v, optionType: v.optionType as OptionType };
    });
}

export const options = loadMockOptions();

function loadMockPositions(): Position[] {
    return mockDb.positions.map((rawPosition) => {
        const option = options.find((option) => option.address == rawPosition.option);
        if (!option) {
            throw new Error("option not found, check db.json");
        }
        return {
            ...rawPosition,
            option,
        };
    });
}

export const positions = loadMockPositions();
