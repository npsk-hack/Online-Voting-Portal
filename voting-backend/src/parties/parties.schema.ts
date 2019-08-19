import * as mongoose from 'mongoose';

const PartySchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
    abbreviation: {
       type: String,
       required: true
    },
    logoURL: {
       type: String,
       required: true
    },
    description: {
       type: String,
       default: ''
    }
});

PartySchema.index({ description: 'text '});

export { PartySchema };
