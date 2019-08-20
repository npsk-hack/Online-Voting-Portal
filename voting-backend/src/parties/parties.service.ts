import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {PartiesInterface} from "./parties.interface";
import {Model} from "mongoose";
import {PartiesDto} from "./parties.dto";

@Injectable()
export class PartiesService {
    constructor(@InjectModel('parties') private readonly partyModel: Model<PartiesInterface>) {}

    create(partyDTO: PartiesDto): Promise<PartiesInterface> {
        const party = new this.partyModel({
            name: partyDTO.name,
            abbreviation: partyDTO.abbreviation,
            logoURL: partyDTO.logoURL,
            description: partyDTO.description
        });
        return party.save();
    }

    getAll(): Promise<PartiesInterface[]> {
        return this.partyModel.find().select('_id name abbreviation').exec();
    }

    findOne(id: string): Promise<PartiesInterface> {
        return this.partyModel.findOne({ _id: id }).exec();
    }

    findOneAndUpdate(id: string, update): Promise<PartiesInterface> {
        return this.partyModel.findOneAndUpdate({ _id: id },{ update }, {new: true}).exec();
    }

    deleteParty(id: string) {
        return this.partyModel.deleteOne({ _id: id }).exec();
    }
}
