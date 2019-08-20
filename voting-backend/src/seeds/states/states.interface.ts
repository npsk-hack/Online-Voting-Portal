import { Document } from "mongoose";

export interface StatesInterface extends Document {
    readonly name: string;
    readonly districts?: string[];
}

