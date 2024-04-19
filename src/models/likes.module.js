
import mongoose from 'mongoose'

const likesSchema = new mongoose.Schema({
  likeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  }
 
},{timestamps: true})
export const Like = mongoose.model('Like', likesSchema) 