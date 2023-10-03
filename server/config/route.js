const express =require('express')
const route = express.Router()
const postController = require('../controller/postController')
const detailController =require('../controller/detailController')
const authenticationController = require('../controller/authentication')

route.post('/submit-new-post',authenticationController.isAuth, postController.submitPost) //hata kodu
route.get('/get-posts',authenticationController.isAuth , postController.getPosts) //Veritabanındaki postları getirir

route.get('/delete-detail/:id',detailController.deleteDetail)
route.post('/delete-post',authenticationController.isAuth ,postController.deletePost)
route.post('/like-post', authenticationController.isAuth, postController.likePost)

route.post('/login-user', authenticationController.loginUser);
route.post('/signup-user', authenticationController.signupUser)
module.exports = route
