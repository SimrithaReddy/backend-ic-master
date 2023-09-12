const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const postSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    photo:{
        type:String
    }
})


const posts = mongoose.model("karands", postSchema);

module.exports = posts;