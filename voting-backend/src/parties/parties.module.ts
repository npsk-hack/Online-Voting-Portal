import { Module } from '@nestjs/common';
import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PartySchema} from "./parties.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'parties',
          schema: PartySchema
        }
      ])
  ],
  controllers: [PartiesController],
  providers: [PartiesService]
})
export class PartiesModule {}
