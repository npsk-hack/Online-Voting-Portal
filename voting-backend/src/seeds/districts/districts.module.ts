import { Module } from '@nestjs/common';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DistrictSchema} from "./districts.schema";
import {StatesService} from "../states/states.service";
import {StateSchema} from "../states/states.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'districts',
          schema: DistrictSchema
        }, {
          name: 'states',
          schema: StateSchema
        }
      ])
  ],
  controllers: [DistrictsController],
  providers: [DistrictsService, StatesService],
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
