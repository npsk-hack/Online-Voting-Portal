import { Document } from "mongoose";

export interface ConstituenciesInterface extends Document {
    readonly name: string;
}
