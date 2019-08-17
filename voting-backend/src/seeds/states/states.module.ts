import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import {MongooseModule} from "@nestjs/mongoose";
import {StateSchema} from "./states.schema";
import {DistrictSchema} from "../districts/districts.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'states',
          schema: StateSchema
        }, {
          name: 'districts',
          schema: DistrictSchema
        }
      ])
  ],
  controllers: [StatesController],
  providers: [StatesService],
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
