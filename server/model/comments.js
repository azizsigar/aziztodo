const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: Schema.Types.String,
        ref: "User",
        required: true
    },
    post_id: {
        type: Schema.Types.String, 
        ref: "Post"
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now() //acilis gunu
    }

})

module.exports = mongoose.model("Comments", commentSchema)