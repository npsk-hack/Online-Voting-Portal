import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {CandidatesInterface} from "./candidates.interface";
import {Model} from "mongoose";
import {CandidatesDto} from "./candidates.dto";

@Injectable()
export class CandidatesService {
    constructor(@InjectModel('candidates') private readonly candidateModel: Model<CandidatesInterface>) {}

    getAll(): Promise<CandidatesInterface[]> {
        return this.candidateModel.find().exec();
    }

    create(candidateDTO: CandidatesDto): Promise<CandidatesInterface> {
        const candidate = new this.candidateModel({
            name: candidateDTO.name,
            state: candidateDTO.state,
            district: candidateDTO.district,
            constituency: candidateDTO.constituency,
            party: candidateDTO.party,
        });
        return candidate.save();
    }

    findOne(id: string): Promise<CandidatesInterface> {
        return this.candidateModel.findOne({ _id: id }).populate('party state district constituency').exec();
    }

    findOneAndUpdate(id: string, update): Promise<CandidatesInterface> {
        return this.candidateModel.findOneAndUpdate({ _id: id }, update, { new: true }).populate('party state district constituency').exec();
    }

    deleteOne(id: string) {
        return this.candidateModel.deleteOne({ _id: id });
    }

    getCandidatesByConstituency(constituencyID: string): Promise<CandidatesInterface[]> {
        return this.candidateModel.find({ constituency: constituencyID }).populate('party').exec();
    }

    incrementVoteCount(candidateID: string): Promise<CandidatesInterface> {
        return this.candidateModel.findOneAndUpdate({ _id: candidateID}, { $inc: {
            votes: 1,
            },
        }).exec();
    }
}
