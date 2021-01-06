import { Option } from "../models";
import { XOpts } from "../xopts";

export class MockXOpts implements XOpts {
    private options: Option[] = [];

    async saveOption(option: Option): Promise<string> {
        this.options.push(option);
        return this.options.length.toString();
    }

    async loadPositions(): Promise<Option[]> {
        // not implemented
    }

    async loadOption(optionId: string): Promise<Option> {
        // not implemented
    }

    async executeOption(optionId: string): Promise<void> {
        // not implemnented
    }
}
