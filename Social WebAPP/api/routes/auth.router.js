const express = require("express")
const authRouter = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/users.model")


//Register User
authRouter.post("/register", async (req,res) =>{
    try{ //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 

        //create new user
        const newUser = await new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })

        const user = await User.create(newUser)
        res.status(200).json(user)
    } catch (err) { 
        res.status(500).json(err)
    }
})

//lOGIN User
authRouter.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email})
        !user && res.status(404).json("User not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password")

        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = authRouter