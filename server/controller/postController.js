const postModel = require('../model/postModel')
const User = require('../model/User')
const dotenv = require('dotenv');

dotenv.config()
const HomePage = (req, res) => {
    postModel.find()
        // console.log(req.body)
        .populate('details', "_id detail")
        .sort({ created_at: -1 })
        .then(data => {
            // console.log(data)
            res.render("app", {
                post: data
            })
        })
        .catch(err => { //icerik yoksa hata kodu
            console.log(err)
        })

}


const submitPost = (req, res) => { //metni gonderme butonu
    if (req.body.title === "" || req.body.desc === "") {
        return;
    } else {
        let newPost = new postModel(req.body)
        newPost.save()
            .then(() => {
                res.status(200).json({ status: "Accepted", message: "Post Kaydedildi!"})
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const getPosts = (req, res) => {
    postModel.find()
        // console.log(req.body)
        .populate('details', "_id detail")
        .sort({ created_at: -1 })
        .then(data => {
           res.status(200).json({ status: "Accepted", message: {
            data: data
           }})
        })
        .catch(err => { //icerik yoksa hata kodu
            console.log(err)
        })
}

const getMyPosts = (req, res) => {
    postModel.find(
        { author: req.user.id }
    )
        // console.log(req.body)
        .populate('details', "_id detail")
        .sort({ created_at: -1 })
        .then(data => {
           res.status(200).json({ status: "Accepted", message: {
            data: data
           }})
        })
        .catch(err => { //icerik yoksa hata kodu
            console.log(err)
        })
}

const getMyFavoritePosts = (req, res) => {
    User.findById(req.user.id)
        .populate('likedPosts')
        .sort({ created_at: -1 })
        .then(data => {
           res.status(200).json({ status: "Accepted", message: {
            data: data.likedPosts
           }})
        })
        .catch(err => { //icerik yoksa hata kodu
            console.log(err)
        })
}

const editPost = (req, res) => {
    const {title, desc, id} = req.body
    postModel.findByIdAndUpdate(id, {title: title, desc: desc}).then(data => {
        res.status(200).json({ status: "Accepted", message: 'Post Saved!'})
    }).catch(err => { 
        res.status(500).json({ status: "Rejected", message: 'Post Not Saved!'})
    });
}

const deletePost= (req,res) => {
    const { id } = req.body;
    postModel.findByIdAndDelete(id)
        .then(() =>{
            res.status(200).json({ status: "Accepted", message:"Post Başarıyla Silindi!"});
        })
        .catch((err => {
            if(err) res.status(500).json({ status: "Rejected", message:"Post silinirken bir hata oluştu!"});
        }))
}

// Like Process
const likePost = async (req, res) => {
    try {
        const { postId } = req.body; 

        if (!postId) return res.status(500).json({ status: "Rejected", message: "Post Id Required!"});  // Control Post Id
        
        if (!req.user) return res.status(500).json({ status: "Rejected", message: "User Not Found!"}); // Control User

        const user = await User.findById(req.user.id); // Get User

        if (!user) return res.status(500).json({ status: "Rejected", message: "User Not Found!"}); // Control User Data

        const post = await postModel.findById(postId); // Get Post

        if (!post) return res.status(500).json({ status: "Rejected", message: "Post Not Found!"}); // Control Post Data

        console.log(user.likedPosts.some(obj => console.log(obj)))

        // Eğer Post Beğenildiyse o id'yi iki modelden de kaldır
        if(user.likedPosts.some(obj => obj === post.id)) {
            let deleteLikedPostIndex = user.likedPosts.findIndex(obj => obj === post.id); 
            user.likedPosts.splice(deleteLikedPostIndex,1); // Remove Liked Post from Index

            let deleteLikesIndex = post.likes.findIndex(obj => obj === user.id); 
            post.likes.splice(deleteLikesIndex,1); // Remove Liker from Index

            await user.save();
            await post.save();

            return res.status(200).json({status: "Success", message: "unliked!"});
        }

        // Push Id Eachother
        user.likedPosts.push(post.id)
        post.likes.push(user.id);

        await user.save();
        await post.save();

        res.status(200).json({status: "Success", message: "Liked!"});
    } catch (err) {
        res.status(500).json(err);
    }
    
}


module.exports = {
    HomePage,
    submitPost,
    deletePost,
    getPosts,
    likePost,
    editPost,
    getMyPosts,
    getMyFavoritePosts
}