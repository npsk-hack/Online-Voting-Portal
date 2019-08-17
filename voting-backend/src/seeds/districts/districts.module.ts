import { Module } from '@nestjs/common';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DistrictSchema} from "./districts.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'districts',
          schema: DistrictSchema
        }
      ])
  ],
  controllers: [DistrictsController],
  providers: [DistrictsService],
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
