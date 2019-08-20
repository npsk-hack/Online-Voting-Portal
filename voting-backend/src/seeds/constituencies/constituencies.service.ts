import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ConstituenciesInterface} from "./constituencies.interface";
import {ConstituenciesDto} from "./constituencies.dto";

@Injectable()
export class ConstituenciesService {
    constructor(@InjectModel('constituencies') private constituenciesModel: Model<ConstituenciesInterface>) {}

    create(constituencyDTO: ConstituenciesDto): Promise<ConstituenciesInterface> {
        const constituency = new this.constituenciesModel({
            name: constituencyDTO.name
        });
        return constituency.save();
    }

    getAll(): Promise<ConstituenciesInterface[]> {
        return this.constituenciesModel.find().exec()
    }

    getOne(id: string): Promise<ConstituenciesInterface> {
        return this.constituenciesModel.findOne({ _id: id }).exec();
    }

    updateConstituencyName(id: string, name: string): Promise<ConstituenciesInterface> {
        return this.constituenciesModel.findOneAndUpdate({ _id: id }, { name: name }, { new: true }).exec();
    }

    deleteConstituency(id: string): Promise<ConstituenciesInterface> {
        return this.constituenciesModel.findOneAndDelete({ _id: id }).exec();
    }
}
