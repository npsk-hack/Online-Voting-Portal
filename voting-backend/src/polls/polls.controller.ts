import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {CandidatesInterface} from '../candidates/candidates.interface';
import {VotersService} from '../voters/voters.service';
import {CandidatesService} from '../candidates/candidates.service';
import {VoteModel} from "./vote.model";

@Controller('api/v1/polls')
export class PollsController {

    constructor(private readonly voterService: VotersService, private readonly candidateService: CandidatesService) {}

    @Get('/vote')
    async getCandidatesList(@Query() vid: string): Promise<CandidatesInterface[]> {
        const voter = await this.voterService.findOne(vid);
        return this.candidateService.getCandidatesByConstituency(voter.constituency);
    }

    @Post('vote')
    async castVoter(@Body() vote: VoteModel) {
        await this.voterService.markVoted(vote.vid);
        await this.candidateService.incrementVoteCount(vote.candidate_id);
        return { success: true };
    }

}
