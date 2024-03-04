
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

//to-do validation against malicious(malicious)

const User = require("../Models/user");

//@Route POST api/users/register
//@desc registers a user
//@access public
router.post("/register", (req, res) => {
    const { userName, email, password } = req.body;

    console.log(req.body);

    // check if user exists
    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: "User email already exists" });
            } else {
                // frontend should verify the format of these
                const createdDate = new Date();
                const following = 0;
                const followers = 0;
                const displayName = userName;

                const newUser = new User({
                    userName,
                    email,
                    password,
                    createdDate,
                    following,
                    followers,
                    displayName
                });

                bcrypt.genSalt(10, (err, salt)=>{
                   bcrypt.hash(newUser.password, salt, (err,hash)=>{
                     if (err) throw err;
                     newUser.password = hash;
                     newUser
                     .save()
                     .then((user)=> res.json(user))
                     .catch((err)=> {
                        console.log(err);
                        res.status(400).json({ message: "there was an error registering user" })   
                    })
                   })

                
                   
                })
               
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            return res.status(500).json({ message: "Error finding user" });
        });
});

module.exports = router;