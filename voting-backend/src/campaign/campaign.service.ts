import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {CampaignInterface} from "./campaign.interface";
import {Model} from "mongoose";
import {CampaignDto} from "./campaign.dto";

@Injectable()
export class CampaignService {
    constructor(@InjectModel('campaigns') private readonly campaignModel: Model<CampaignInterface>) {}

    create(campaignDTO: CampaignDto): Promise<CampaignInterface> {
        const campaign = new this.campaignModel({
            party: campaignDTO.party_id,
            content: campaignDTO.content,
            thumbnail: campaignDTO.thumbnail
        });
        return campaign.save();
    }

    getAll(): Promise<CampaignInterface[]> {
        return this.campaignModel.find().exec()
    }

    findOne(id: string): Promise<CampaignInterface> {
        return this.campaignModel.findOne({ _id: id }).populate('party').exec();
    }

    findOneAndUpdate(id: string, update): Promise<CampaignInterface> {
        return this.campaignModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
    }

    deleteOne(id: string) {
        return this.campaignModel.deleteOne({ _id: id }).exec();
    }
}
