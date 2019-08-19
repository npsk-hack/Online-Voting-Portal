import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CandidatesService} from "./candidates.service";
import {CandidatesInterface} from "./candidates.interface";
import {CandidatesDto} from "./candidates.dto";

@Controller('api/v1/candidates')
export class CandidatesController {

    constructor(private readonly candidateService: CandidatesService) {}

    @Get()
    getAllCandidates(): Promise<CandidatesInterface[]> {
        return this.candidateService.getAll();
    }

    @Post()
    createCandidate(@Body() candidateDTO: CandidatesDto): Promise<CandidatesInterface> {
        return this.candidateService.create(candidateDTO);
    }

    @Get(':id')
    findCandidateByID(@Param(':id') id: string): Promise<CandidatesInterface> {
        return this.candidateService.findOne(id);
    }

    @Put(':id')
    updateCandidate(@Param(':id') id: string, @Body() update): Promise<CandidatesInterface> {
        return this.candidateService.findOneAndUpdate(id, update);
    }

    @Delete(':id')
    deleteCandidate(@Param(':id') id: string) {
        return this.candidateService.deleteOne(id);
    }
}
