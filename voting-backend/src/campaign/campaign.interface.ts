import {Document} from "mongoose";

export interface CampaignInterface extends Document {
    readonly party: string;
    readonly content: string;
    readonly thumbnail: string;
}
