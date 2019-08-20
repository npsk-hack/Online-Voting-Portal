import {Controller, Get} from '@nestjs/common';
import {SeedsService} from "./seeds.service";

@Controller('api/v1/seeds')
export class SeedsController {
    constructor(private seedService: SeedsService) {}

    @Get('')
    async getDatabaseStatus() {
        return {
            states: await this.seedService.getNoOfStates(),
            districts: await this.seedService.getNoOfDistricts(),
            constituencies: await this.seedService.getNoOfConstituencies()
        }
    }
}
