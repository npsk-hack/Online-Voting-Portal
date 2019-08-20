import {Document} from "mongoose";

export interface PartiesInterface extends Document {
    readonly name: string;
    readonly abbreviation: string;
    readonly logoURL: string;
    readonly description: string;
}
