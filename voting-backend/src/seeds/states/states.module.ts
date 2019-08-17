import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import {MongooseModule} from "@nestjs/mongoose";
import {StateSchema} from "./states.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'states',
          schema: StateSchema
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
