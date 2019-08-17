import { Document } from "mongoose";

export interface StatesInterface extends Document {
    name: string;
    districts?: string[];
}

