const express = require('express')
const bcrypt = require('bcrypt');
const user = require('./model/user')
const saltRounds = 10;
const { body, validationResult } = require('express-validator');

const router = express.Router()


/**
 * Register an user
 */

router.post("/",
body('email').isEmail(),
// password must be at least 5 chars long
body('password').isLength({ min: 5 }),
async (req,res)=>{
    try{
        console.log('hj')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const { name, mobile, posts, photo, email, password } = req.body;

        let user_data = await user.findOne({ email })

        if (user_data) {
            return res.status(409).send("User already exists with that email")
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.send(err.message)
            }

            user_data = await user.create({
                email: email,
                password: hash
            })

            res.send(user_data)

        })
    } catch (e) {
        console.log(e.message)
        res.send(e.message)
    }
})


module.exports = router