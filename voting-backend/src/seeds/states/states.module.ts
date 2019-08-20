import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import {MongooseModule} from "@nestjs/mongoose";
import {StateSchema} from "./states.schema";
import {DistrictSchema} from "../districts/districts.schema";
import {DistrictsService} from "../districts/districts.service";
import {ConstituenciesService} from "../constituencies/constituencies.service";
import {ConstituencySchema} from "../constituencies/constituencies.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'states',
          schema: StateSchema
        }, {
          name: 'districts',
          schema: DistrictSchema
        }, {
          name: 'constituencies',
          schema: ConstituencySchema
        }
      ])
  ],
  controllers: [StatesController],
  providers: [StatesService, DistrictsService, ConstituenciesService],
  exports: [
      MongooseModule.forFeature([
        {
          name: 'states',
          schema: StateSchema
        }
      ])
  ]
})
export class StatesModule {}
