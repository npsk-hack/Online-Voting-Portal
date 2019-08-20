import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class SeedsService {

    constructor(
        @InjectModel('states') private readonly stateModel: Model<any>,
        @InjectModel('districts') private readonly districtModel: Model<any>,
        @InjectModel('constituencies') private readonly constituencyModel: Model<any>
    ) {}

    async getNoOfStates() {
        return this.stateModel.find().countDocuments();
    }

    async getNoOfDistricts() {
        return this.districtModel.find().countDocuments();
    }

    async getNoOfConstituencies() {
        return this.constituencyModel.find().countDocuments();
    }
}
