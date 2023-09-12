const express = require('express')
const bcrypt = require('bcrypt');
const user = require('./model/user')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const secret = "Assignment"

const router = express.Router()


/**
 * Login an user
 */

router.post("/",
    body('email').isEmail(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send(errors.array());
            }

            const { email, password } = req.body;

            let user_data = await user.findOne({  email })

            if (!user_data) {
                return res.json("User does not exists")
            }                
            bcrypt.compare(password, user_data.password, function (err, result) {
                // result == true
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user_data._id
                    }, secret);
                    return res.send(token)
                }
                else {
                    return res.status(401).send("Invalid Credentails")
                }
            });
            
        } catch (e) {
            console.log(e.message)
            res.send(e.message)
        }
    })


module.exports = router