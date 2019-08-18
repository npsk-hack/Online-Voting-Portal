import { Module } from '@nestjs/common';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DistrictSchema} from "./districts.schema";
import {StatesService} from "../states/states.service";
import {StateSchema} from "../states/states.schema";
import {ConstituenciesService} from "../constituencies/constituencies.service";
import {ConstituencySchema} from "../constituencies/constituencies.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'districts',
          schema: DistrictSchema
        }, {
          name: 'states',
          schema: StateSchema
        }, {
          name: 'constituencies',
          schema: ConstituencySchema
        }
      ])
  ],
  controllers: [DistrictsController],
  providers: [DistrictsService, StatesService, ConstituenciesService],
  exports: [
      MongooseModule.forFeature([
        {
          name: 'districts',
          schema: DistrictSchema
        }
      ])
  ]
})
export class DistrictsModule {}
