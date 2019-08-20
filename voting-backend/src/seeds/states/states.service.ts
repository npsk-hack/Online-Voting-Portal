import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {StatesInterface} from "./states.interface";
import {StatesDto} from "./states.dto";

@Injectable()
export class StatesService {

    constructor(@InjectModel('states') private readonly stateModel: Model<StatesInterface>) {}

    create(statesDto: StatesDto): Promise<StatesInterface> {
        const createdState = new this.stateModel(statesDto);
        return createdState.save();
    }

    getAll(): Promise<StatesInterface[]> {
        return this.stateModel.find().select('_id name').exec();
    }

    findOne(id: string): Promise<StatesInterface> {
        return this.stateModel.findOne({ _id: id }).populate('districts').exec();
    }

    pushNewDistrict(stateName: string, id: string): Promise<StatesInterface> {
        return this.stateModel.findOneAndUpdate({ name: stateName }, {
            $push: {
                "districts": id
            }
        }, { new: true }).exec();
    }

    pullDistrict(id: string): Promise<StatesInterface> {
        return this.stateModel.findOneAndUpdate({
                "districts": id
        }, {
            $pull: {
                "districts": id
            }
        }, {new: true}).exec();
    }

    updateName(id: string, state: StatesDto): Promise<StatesInterface> {
        return this.stateModel.findOneAndUpdate({ _id: id }, state, { new: true }).populate('districts').exec();
    }

    deleteState(id: string) {
        return this.stateModel.deleteOne({ _id: id }).exec();
    }
}
