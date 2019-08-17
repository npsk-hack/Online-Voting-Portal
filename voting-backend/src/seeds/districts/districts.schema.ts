import * as mongoose from 'mongoose';

export const DistrictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    constituencies: [mongoose.Schema.Types.ObjectId]
});
