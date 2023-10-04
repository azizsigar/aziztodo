const jwt = require('jsonwebtoken');
const postModel = require('../model/postModel')
const User = require('../model/User');
const Comment = require('../model/comments')

const createComment = (req, res) => {
    const {post_id, comment} = req.body;

    const newComment = new Comment({
        author: req.user.id,
        post_id: post_id,
        comment: comment
    })

    newComment.save().then(() => {
        res.status(200).json({ status: 'Accepted', message: 'Yorum Yapıldı!'});
    }).catch(err => {
        res.status(500).json({ status: 'Rejected', message: 'Yorum Yapılamadı!'});
    });
}

const getCommentByPost = (req, res) => {
    const { post_id } = req.body;
    Comment.find({
        post_id: post_id
    }).populate('author').sort({ created_at: 1 }).then((data) => {
        res.status(200).json({ status: 'Accepted', message: {data: data}});
    }).catch(err => {
        res.status(500).json({ status: 'Rejected', message: 'Yorumlar Getirilemedi!'});
    })
}

module.exports = {
    createComment,
    getCommentByPost
}

