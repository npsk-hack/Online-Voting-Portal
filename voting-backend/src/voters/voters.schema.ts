import * as mongoose from 'mongoose';

export const VotersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    date_of_birth: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    permanent_address: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'states'
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'districts'
    },
    constituency: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'constituencies'
    },
    temporary_address: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    age_proof: {
        type: String,
        required: true
    },
    address_proof: {
        type: String,
        required: true
    },
    VID: {
        type: String,
        required: true,
        unique: true
    },
    hasCastedVote: {
        type: Boolean,
        default: false,
        required: true
    }
});
