import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PartiesService} from "./parties.service";
import {PartiesInterface} from "./parties.interface";
import {PartiesDto} from "./parties.dto";

@Controller('api/v1/parties')
export class PartiesController {
    constructor( private readonly partyService: PartiesService) {}

    @Get()
    getAllParties(): Promise<PartiesInterface[]> {
        return this.partyService.getAll();
    }

    @Post()
    createParty(partyDTO: PartiesDto): Promise<PartiesInterface> {
        return this.partyService.create(partyDTO);
    }

    @Get(':id')
    getPartyByID(@Param('id') id: string): Promise<PartiesInterface> {
        return this.partyService.findOne(id);
    }

    @Put(':id')
    updatePartyMeta(@Param('id') id: string, @Body() update): Promise<PartiesInterface> {
        return this.partyService.findOneAndUpdate(id, update);
    }

    @Delete(':id')
    deleteParty(@Param('id') id: string) {
        return this.partyService.deleteParty(id);
    }
}
