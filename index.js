const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const app = express();
const register = require('./iregister')
const login = require('./login')
const post = require('./iposts')
const comments = require('./icomments')

app.use(express.json());
dotenv.config()
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use("/register", register)
app.use("/login", login)
app.use("/posts",post)
app.use('/comments',comments)


mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to DB')
})
app.listen(5000, () => {
    console.log(`Server is up at 5000.....`);
})
