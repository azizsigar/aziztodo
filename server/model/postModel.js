const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,        //gorev basligi
        required: true
    },
    desc: {
        type: String,
        required: true       // gorev aciklamasi
    },
    author: {
        type: Schema.Types.String,
        ref: "User",
        required: true
    },
    details: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Detail"
        }
    ],
    likes: {
        type: [Schema.Types.String],
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now() //acilis gunu
    }
})
module.exports = mongoose.model("Post", postSchema)