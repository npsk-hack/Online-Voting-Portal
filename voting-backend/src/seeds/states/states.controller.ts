import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {StatesService} from "./states.service";
import {StatesDto} from "./states.dto";
import {StatesInterface} from "./states.interface";
import {DistrictsService} from "../districts/districts.service";

@Controller('api/v1/seeds/states')
export class StatesController {
    constructor(private readonly statesService: StatesService,
    private readonly districtService: DistrictsService) {}

    @Get()
    getAll(): Promise<StatesInterface[]> {
        return this.statesService.getAll();
    }

    @Post()
    create(@Body() state: StatesDto): Promise<StatesInterface> {
        return this.statesService.create(state);
    }

    @Get(':id')
    getByID(@Param('id') id: string): Promise<StatesInterface> {
        return this.statesService.findOne(id);
    }

    @Put(':id')
    updateStateName(@Param('id') id: string, @Body() state: StatesDto): Promise<StatesInterface> {
        return this.statesService.updateName(id, state);
    }

    @Delete(':id')
    async deleteState(@Param('id') id: string) {
        const state = await this.statesService.findOne(id);
        state.districts.forEach( async district => {
            await this.districtService.deleteDistrict(district)
        });
        return this.statesService.deleteState(id);
    }
}
