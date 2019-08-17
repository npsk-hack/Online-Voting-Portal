import * as mongoose from 'mongoose';

export const StateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    districts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'districts'
        }
    ]
});
