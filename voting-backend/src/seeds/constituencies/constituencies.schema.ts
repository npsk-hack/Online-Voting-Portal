import * as mongoose from 'mongoose';

export const ConstituencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
