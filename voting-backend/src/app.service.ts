import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This is the Online Voting Portal Hack built by team SJPUC.';
  }
}
