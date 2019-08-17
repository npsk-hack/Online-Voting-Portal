import { Module } from '@nestjs/common';
import { ConstituenciesController } from './constituencies.controller';
import { ConstituenciesService } from './constituencies.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConstituencySchema} from "./constituencies.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'constituencies',
        schema: ConstituencySchema
      }
    ])
  ],
  controllers: [ConstituenciesController],
  providers: [ConstituenciesService],
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
