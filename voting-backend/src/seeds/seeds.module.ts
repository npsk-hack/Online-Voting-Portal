import { Module } from '@nestjs/common';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';
import { StatesModule } from './states/states.module';
import { DistrictsModule } from './districts/districts.module';
import { ConstituenciesModule } from './constituencies/constituencies.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [StatesModule, DistrictsModule, ConstituenciesModule]
})
export class SeedsModule {}
