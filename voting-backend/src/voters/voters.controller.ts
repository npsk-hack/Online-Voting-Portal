import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {VotersService} from './voters.service';
import {VotersInterface} from './voters.interface';
import {VotersDto} from './voters.dto';

@Controller('api/v1/voters')
export class VotersController {
    constructor(private readonly voterService: VotersService) {}

    @Get()
    getAllVoters(): Promise<VotersInterface[]> {
        return this.voterService.getAll();
    }

    @Post()
    createVoter(@Body() voterDTO: VotersDto): Promise<VotersInterface> {
        return this.voterService.create(voterDTO);
    }

    @Get(':vid')
    getVoterByVID(@Param('vid') vid: string): Promise<VotersInterface> {
        return this.voterService.findOne(vid);
    }

    @Put(':id')
    updateVoter(@Param('id') id: string, @Body() update): Promise<VotersInterface> {
        return  this.voterService.findOneAndUpdate(id, update);
    }

    @Delete(':id')
    deleteVoter(@Param('id') id: string) {
        return this.voterService.deleteOne(id);
    }
}
