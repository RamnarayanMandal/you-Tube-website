
import mongoose from 'mongoose'

const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'owner is required']
    }

},{timestamps: true})
export const PlayList = mongoose.model('PlayList', playListSchema) 