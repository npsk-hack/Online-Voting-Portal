import { Module } from '@nestjs/common';
import { VotersController } from './voters.controller';

@Module({
  controllers: [VotersController]
})
export class VotersModule {}
