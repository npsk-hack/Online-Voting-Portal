import { Document } from "mongoose";

export interface DistrictsInterface extends Document {
    readonly name: string;
    readonly constituencies: string[];
}
