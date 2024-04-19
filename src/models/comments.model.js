
import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const commentsSchema = new  mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'commenter is required']
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: [true, 'video is required']
    },
    comment: {
        type: String,
        required: [true, 'comment is required']
    },

},{timestamps: true})
commentsSchema.plugin(mongooseAggregatePaginate)    
export const Comment = mongoose.model('Comment', commentsSchema) 