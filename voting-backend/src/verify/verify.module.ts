import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import {VotersService} from '../voters/voters.service';
import {MongooseModule} from "@nestjs/mongoose";
import {VotersSchema} from "../voters/voters.schema";

@Module({
  controllers: [VerifyController],
  providers: [VerifyService, VotersService],
  imports: [
      MongooseModule.forFeature([
        {
          name: 'voters',
          schema: VotersSchema,
        },
      ]),
  ],
})
export class VerifyModule {}
