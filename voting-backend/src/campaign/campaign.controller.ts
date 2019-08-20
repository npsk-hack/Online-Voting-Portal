import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CampaignService} from "./campaign.service";
import {CampaignInterface} from "./campaign.interface";
import {CampaignDto} from "./campaign.dto";

@Controller('api/v1/campaigns')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Get()
    getAllCampaigns(): Promise<CampaignInterface[]> {
        return this.campaignService.getAll();
    }

    @Post()
    createCampaign(campaignDTO: CampaignDto): Promise<CampaignInterface> {
        return this.campaignService.create(campaignDTO);
    }

    @Get(':id')
    getCampaignByID(@Param('id') id: string): Promise<CampaignInterface> {
        return this.campaignService.findOne(id);
    }

    @Put(':id')
    updateCampaign(@Param('id') id: string, update): Promise<CampaignInterface> {
        return this.campaignService.findOneAndUpdate(id, update);
    }

    @Delete(':id')
    deleteCampaign(@Param('id') id: string) {
        return this.campaignService.deleteOne(id);
    }
}
