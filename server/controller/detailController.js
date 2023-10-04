const detailModel = require('../model/detailModel')
const postModel = require('../model/postModel')

const addDetail = (req, res) => {
    if(req.body.detail === '') {
         res.redirect('/')
        // return;
    } else{
        // let newDetail = new detailModel(req.body)
        // newDetail.save()
        // .then(()=>{
        //     res.redirect('/')
        // })
        // .catch(err=>{
        //     console.log(err)
        // })

        
         let newDetail = {
             detail: req.body.detail,
             post_id: req.params.id
         } 
     let detail = new detailModel(newDetail);

     detail.save()
     .then(() => {
        updatePostData(req.params. id,detail._id,res)

     })
         .catch(err => {
             console.log(err)
         })
    }
      
}

function updatePostData(postId,detailId,res){
    
    postModel.findById(postId)
        .then(post =>{
            post.details.push(detailId)
            post.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch(err=>{console.log(err)})
        })
        .catch(err=>{console.log(err)})
        // res.redirect('/')
     
}
const deleteDetail= (req,res) => {
    detailModel.findByIdAndDelete(req.param.id)
    .then(() =>{
        res.redirect("/")
    })
    .catch((err => {
        console.log(err)
    }))
    }

module.exports = {
    addDetail,
    deleteDetail,
    
}