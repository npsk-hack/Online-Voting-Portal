import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CandidateSchema} from "./candidates.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'candidates',
        schema: CandidateSchema
      }
    ])
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService]
})
export class CandidatesModule {}
