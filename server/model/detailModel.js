const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailSchema = new Schema({
    detail: {
        type: String,        //detay basligi
        required: true
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    created_at: {
        type: Date,
        default: Date.now() //acilis gunu
    }

})

module.exports = mongoose.model("Detail", detailSchema)