import * as mongoose from 'mongoose';

export const DistrictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    constituencies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'constituencies'
        }
    ]
});
