import { Module } from '@nestjs/common';
import { ConstituenciesController } from './constituencies.controller';
import { ConstituenciesService } from './constituencies.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConstituencySchema} from "./constituencies.schema";
import {DistrictsService} from "../districts/districts.service";
import {DistrictSchema} from "../districts/districts.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'constituencies',
        schema: ConstituencySchema
      }, {
        name: 'districts',
        schema: DistrictSchema
      }
    ])
  ],
  controllers: [ConstituenciesController],
  providers: [ConstituenciesService, DistrictsService],
  exports: [
    MongooseModule.forFeature([
      {
        name: 'constituencies',
        schema: ConstituencySchema
      }
    ])
  ]
})
export class ConstituenciesModule {}
