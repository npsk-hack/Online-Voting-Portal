import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedsModule } from './seeds/seeds.module';
import { VotersModule } from './voters/voters.module';
import { CandidatesModule } from './candidates/candidates.module';
import { CampaignModule } from './campaign/campaign.module';
import {MongooseModule} from '@nestjs/mongoose';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PartiesModule } from './parties/parties.module';
import { VerifyModule } from './verify/verify.module';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [
      SeedsModule,
      VotersModule,
      CandidatesModule,
      CampaignModule,
      MongooseModule.forRoot('mongodb://localhost/voting-portal', { useFindAndModify: false }),
      FileUploadModule,
      PartiesModule,
      VerifyModule,
      PollsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
