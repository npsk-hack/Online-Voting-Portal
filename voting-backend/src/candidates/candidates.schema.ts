import * as mongoose from 'mongoose';

export const CandidateSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   party: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'parties'
   },
   state: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'states'
   },
   district: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'districts'
   },
   constituency: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'constituencies'
   },
   votes: {
       type: Number,
       default: 0
   }
});
