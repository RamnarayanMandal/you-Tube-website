
import mongoose from 'mongoose'

const tweetsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Tweet is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },

},{timestamps: true})
export const Tweets = mongoose.model('Tweets', tweetsSchema) 