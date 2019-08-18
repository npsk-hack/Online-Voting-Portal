import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ConstituenciesService} from "./constituencies.service";
import {ConstituenciesDto} from "./constituencies.dto";
import {ConstituenciesInterface} from "./constituencies.interface";
import {DistrictsService} from "../districts/districts.service";

@Controller('api/v1/seeds/constituencies')
export class ConstituenciesController {
    constructor(
        private readonly constituencyService: ConstituenciesService,
        private readonly districtService: DistrictsService
    ) {}

    @Get()
    getAll(): Promise<ConstituenciesInterface[]> {
        return this.constituencyService.getAll();
    }

    @Post()
    async create(@Body() constituencyDTO: ConstituenciesDto): Promise<ConstituenciesInterface> {
        const constituency = await this.constituencyService.create(constituencyDTO);
        await this.districtService.pushNewConstituency(constituencyDTO.districtName, constituency._id);
        return new Promise( resolve => {
            resolve(constituency)
        });
    }

    @Get(':id')
    getByID(@Param('id') id: string): Promise<ConstituenciesInterface> {
        return this.constituencyService.getOne(id);
    }

    @Put(':id')
    async updateConstituency(@Param('id')  id: string, @Body() constituencyDTO: ConstituenciesDto): Promise<ConstituenciesInterface> {
        if (constituencyDTO.districtName) {
            await this.districtService.pullConstituency(id);
            await this.districtService.pushNewConstituency(constituencyDTO.districtName, id)
        }
        return this.constituencyService.updateConstituencyName(id, constituencyDTO.name);
    }

    @Delete(':id')
    async deleteConstituency(@Param('id') id: string) {
        await this.districtService.pullConstituency(id);
        return this.constituencyService.deleteConstituency(id);
    }
}
