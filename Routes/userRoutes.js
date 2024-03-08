
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const validateRegisterInput = require("../Validation/Register");
const validateLoginInput = require("../Validation/Login")

//to-do validation against malicious(malicious)

const User = require("../Models/user");


//@Route GET api/users
//@desc test route for cron-jon
//@access public
router.get("/test", (req,res)=>{
    const { obj} = req.body;
    console.log(obj)
    res.json({"msg":"sucess"})
})

//@Route POST api/users/login
//desc route for login
//@access public
router.post("/login", (req,res)=>{
    const { errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const {email, password} = req.body;

    User.findOne({email})
        .then( (user)=>{        
          if(!user){
           return res.status(200).json("user does not exist")
          }
          bcrypt.compare(password, user.password).then((isMatch)=>{
            if(isMatch){
                const payload = {
                    id: user.id,
                    userName: user.userName
                };
                jwt.sign(payload, "mySecret", {
                    expiresIn: 31556926 //1 year in seconds
                }, (err, token)=>{
                    if (err) throw err;
                    res.status(200).json({
                        token: "Bearer" + token
                    });
                })
            }else{
                return res.status(400).json({msg: "password is incorrect"})
            }
          })          
        });

        })

//@Route POST api/users/register
//@desc registers a user
//@access public
router.post("/register", (req, res) => {

     // Form validation
     const { errors, isValid } = validateRegisterInput(req.body);
     if (!isValid) {
        return res.status(400).json(errors);
      }
    const { userName, email, password, password2 } = req.body;
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