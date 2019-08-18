import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DistrictsInterface} from "./districts.interface";
import {DistrictsDto} from "./districts.dto";
import {ConstituenciesService} from "../constituencies/constituencies.service";

@Injectable()
export class DistrictsService {

    constructor(@InjectModel('districts') private readonly districtModel: Model<DistrictsInterface>, private constituencyService: ConstituenciesService) {}

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
        const district = await this.findOne(id);
        district.constituencies.forEach( async constituency => {
            await this.constituencyService.deleteConstituency(constituency);
        });
        return this.districtModel.deleteOne({ _id: id }).exec();
    }

    async pushNewConstituency(districtName: string, id: string): Promise<DistrictsInterface> {
        return this.districtModel.findOneAndUpdate({ name: districtName }, {
            $push: {
                "constituencies": id
            }
        }, { new: true }).exec();
    }

    async pullConstituency(id: string): Promise<DistrictsInterface> {
        return this.districtModel.findOneAndUpdate({
            "constituencies": id
        }, {
            $pull: {
                "constituencies": id
            }
        }, { new: true }).exec();
    }
}
