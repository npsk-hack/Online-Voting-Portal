import {Document} from "mongoose";

export interface CandidatesInterface extends Document {
    readonly name: string;
    readonly party: string;
    readonly state: string;
    readonly district: string;
    readonly constituency: string;
    readonly votes: number
}
