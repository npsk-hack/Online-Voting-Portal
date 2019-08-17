import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DistrictsInterface} from "./districts.interface";
import {DistrictsDto} from "./districts.dto";

@Injectable()
export class DistrictsService {

    constructor(@InjectModel('districts') private readonly districtModel: Model<DistrictsInterface>) {}

    getAll(): Promise<DistrictsInterface[]> {
        return this.districtModel.find().select('_id name').exec();
    }

    async create(district: DistrictsDto): Promise<DistrictsInterface> {
        const newDistrict = new this.districtModel({
            name: district.name
        });
        return await newDistrict.save();
    }

    async findOne(id: string): Promise<DistrictsInterface> {
        return this.districtModel.findOne({ _id: id }).populate('constituencies').exec();
    }

    async updateDistrict(id: string, districtDTO: DistrictsDto): Promise<DistrictsInterface> {
        return this.districtModel.findOneAndUpdate({ _id: id }, districtDTO, { new: true }).populate('constituencies').exec();
    }

    async deleteDistrict(id: string) {
        return this.districtModel.deleteOne({ _id: id }).exec();
    }
}
