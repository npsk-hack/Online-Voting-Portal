import { Module } from '@nestjs/common';
import { VotersController } from './voters.controller';
import { VotersService } from './voters.service';
import {MongooseModule} from "@nestjs/mongoose";
import {VotersSchema} from "./voters.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'voters',
        schema: VotersSchema
      }
    ])
  ],
  controllers: [VotersController],
  providers: [VotersService]
})
export class VotersModule {}
