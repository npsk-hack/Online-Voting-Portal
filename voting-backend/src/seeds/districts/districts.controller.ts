import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DistrictsService} from "./districts.service";
import {StatesService} from "../states/states.service";
import {DistrictsInterface} from "./districts.interface";
import {DistrictsDto} from "./districts.dto";

@Controller('api/v1/seeds/districts')
export class DistrictsController {
    constructor(
        private readonly districtService: DistrictsService,
        private readonly stateService: StatesService
    ) {}

    @Get()
    async getAll(): Promise<DistrictsInterface[]> {
        return this.districtService.getAll();
    }

    @Post()
    async create(@Body() districtDTO: DistrictsDto): Promise<DistrictsInterface> {
        const district = await this.districtService.create(districtDTO);
        await this.stateService.pushNewDistrict(districtDTO.stateName, district._id);
        return new Promise( resolve => {
            resolve(district)
        });
    }

    @Get(':id')
    async findByID(@Param('id') id: string): Promise<DistrictsInterface> {
        return this.districtService.findOne(id);
    }

    @Put(':id')
    async updateDistrict(@Param('id') id: string, @Body() districtDTO: DistrictsDto): Promise<DistrictsInterface> {
        if(districtDTO.stateName) {
            await this.stateService.pullDistrict(id);
            await this.stateService.pushNewDistrict(districtDTO.stateName, id);
        }
        return this.districtService.updateDistrict(id, districtDTO);
    }

    @Delete(':id')
    async deleteDistrict(@Param('id') id: string) {
        await this.stateService.pullDistrict(id);
        return this.districtService.deleteDistrict(id);
    }
}
