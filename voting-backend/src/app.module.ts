import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedsModule } from './seeds/seeds.module';
import { VotersModule } from './voters/voters.module';
import { CandidatesModule } from './candidates/candidates.module';
import { CampaignModule } from './campaign/campaign.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      SeedsModule,
      VotersModule,
      CandidatesModule,
      CampaignModule,
      MongooseModule.forRoot('mongodb://localhost/voting-portal', { useFindAndModify: false })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
