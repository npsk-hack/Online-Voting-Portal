import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import {VotersService} from '../voters/voters.service';
import {MongooseModule} from "@nestjs/mongoose";
import {VotersSchema} from "../voters/voters.schema";
import {CandidatesService} from "../candidates/candidates.service";
import {CandidateSchema} from "../candidates/candidates.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'voters',
        schema: VotersSchema
      }, {
        name: 'candidates',
        schema: CandidateSchema
      }
    ])
  ],
  providers: [VotersService, CandidatesService],
  controllers: [PollsController]
})
export class PollsModule {}
