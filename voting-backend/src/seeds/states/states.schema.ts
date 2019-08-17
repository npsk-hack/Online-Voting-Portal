import * as mongoose from 'mongoose';

export const StateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    districts: [mongoose.Schema.Types.ObjectId]
});
