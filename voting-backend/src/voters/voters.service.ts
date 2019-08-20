import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {VotersInterface} from "./voters.interface";
import {Model} from "mongoose";
import {VotersDto} from "./voters.dto";

@Injectable()
export class VotersService {
    constructor(@InjectModel('voters') private readonly voterModel: Model<VotersInterface>) {}

    getAll(): Promise<VotersInterface[]> {
        return this.voterModel.find().select('first_name last_name date_of_birth gender email mobile_number photo VID').exec()
    }

    create(voterDTO: VotersDto): Promise<VotersInterface> {
        const vid = Math.random().toString().slice(2,14);
        const voter = new this.voterModel({
            first_name: voterDTO.first_name,
            last_name: voterDTO.last_name,
            date_of_birth: voterDTO.date_of_birth,
            gender: voterDTO.gender,
            email: voterDTO.email,
            mobile_number: voterDTO.mobile_number,
            permanent_address: voterDTO.permanent_address,
            state: voterDTO.state,
            district: voterDTO.district,
            constituency: voterDTO.constituency,
            temporary_address: voterDTO.temporary_address,
            photo: voterDTO.photo,
            age_proof: voterDTO.age_proof,
            address_proof: voterDTO.address_proof,
            VID: vid.slice(1, 4).concat(' '.concat(vid.slice(5, 8).concat(' '.concat(vid.slice(9, 12)))))
        });
        return voter.save();
    }

    findOne(vid: string): Promise<VotersInterface> {
        return this.voterModel.findOne({ VID: vid }).exec();
    }

    findOneAndUpdate(id: string, update): Promise<VotersInterface> {
        return  this.voterModel.findOneAndUpdate({ _id: id }, update, { new: true }).populate('state district constituency').exec();
    }

    deleteOne(id: string) {
        return this.voterModel.deleteOne({ _id: id });
    }

    markVoted(id: string): Promise<VotersInterface> {
        return this.voterModel.findOneAndUpdate({ _id: id}, { hasCastedVote: true }).exec();
    }
}
