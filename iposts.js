const express = require('express')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload');
const cloudinary = require('./cloudinary');
const post = require("./model/posts");
const app = express()
app.use(fileUpload({ useTempFiles: true }))
app.use(bodyparser.json())
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));


app.post("/",async(req,res)=>{
    try {
        const file = req.files.PostImage

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "karands"
        })

        let userPosts = await post.create({
            username: req.body.username,
            email: req.body.email,
            imageUrl: result.secure_url
        })
        res.send(userPosts)
    } catch (error) {
        res.send(error.message)
    }
})


app.get("/",async(req,res)=>{
    try {
        let sortImages = await post.find().sort({createdAt:"-1"});
        res.send(sortImages)
    } catch (error) {
        res.send(error.message)
    }
})


app.post('/addlikes',async(req,res)=>{
    try {
        let likefind = await post.find({_id:req.body._id})
        let find = await post.updateOne({_id:req.body._id},{$set:{likes:likefind[0].likes+1}})
        res.send(find)
    } catch (error) {
        res.send(error.message)  
    }
})

module.exports=app