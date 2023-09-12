const express = require('express')
const bodyparser = require('body-parser')
const post = require("./model/posts");
const app = express()
app.use(bodyparser.json())
app.use(express.json());
app.use(express.urlencoded());


app.post("/",async(req,res)=>{
    try {
        let {username, text, _id} = req.body;
        let commentidfound = await post.find({_id:_id});
        let find = await post.updateOne({_id:_id},
            {$set:{comments:[commentidfound[0].comments,{username:username,text:text}]}}) 
        commentidfound = await post.find({_id:_id});
        console.log(commentidfound)
        res.send(commentidfound)  
    } catch (error) {
        console.log(error.message)
        res.send(error.message) 
    }
})

module.exports=app