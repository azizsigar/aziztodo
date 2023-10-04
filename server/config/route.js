const express =require('express')
const route = express.Router()
const postController = require('../controller/postController')
const detailController =require('../controller/detailController')
const authenticationController = require('../controller/authentication')
const commentController = require('../controller/commentController')

route.post('/submit-new-post',authenticationController.isAuth, postController.submitPost) //hata kodu
route.get('/get-posts',authenticationController.isAuth , postController.getPosts) //Veritabanındaki postları getirir
route.get('/get-my-posts',authenticationController.isAuth , postController.getMyPosts) //Veritabanındaki postları getirir
route.get('/get-my-favorite-posts',authenticationController.isAuth , postController.getMyFavoritePosts) //Veritabanındaki postları getirir

route.get('/delete-detail/:id',detailController.deleteDetail)
route.post('/delete-post',authenticationController.isAuth ,postController.deletePost)
route.post('/like-post', authenticationController.isAuth, postController.likePost)
route.post('/edit-post', authenticationController.isAuth, postController.editPost);

route.post('/login-user', authenticationController.loginUser);
route.post('/signup-user', authenticationController.signupUser)

route.post('/create-comment', authenticationController.isAuth, commentController.createComment);
route.post('/get-comments', authenticationController.isAuth, commentController.getCommentByPost);
module.exports = route
