import * as mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parties',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    }
});

CampaignSchema.index({ content: 'text '});

export { CampaignSchema };
