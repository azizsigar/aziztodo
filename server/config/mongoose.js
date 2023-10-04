const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://aziz:1234@aziz.fjez7sn.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('DB on')
})
.catch((err)=>{
    console.log('db error')
})
//klasik mangodb