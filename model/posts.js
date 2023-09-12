const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const postSchema = new mongoose.Schema({
   username:{
    type:String
   },
   email:{
    type:String
   },
   imageUrl:{
    type:String
   },
   likes:{
      type:Number,
      default:0
   },
   comments:{
    type:Array
   }
},{timestamps:true})


const posts = mongoose.model("karandsposts", postSchema);

module.exports = posts;