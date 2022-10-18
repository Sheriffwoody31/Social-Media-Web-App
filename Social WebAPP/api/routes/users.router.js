const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/users.model")
const { Router } = require("express")

//update user
userRouter.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin)
    { if(req.body.password){
              try{
                  const salt = await bcrypt.genSalt(10)
                  req.body.password = await bcrypt.hash(req.body.password, salt) 
              }catch(err){
                return res.status(500).json(err)
              }
      }
      try{
           const user = await User.findByIdAndUpdate(req.params.id , {$set: req.body})
           res.status(200).json("Account has been updated !") //we can return user also here 
         }catch(err){
            return res.status(500).json(err)
         }
    }else{
        return res.status(403).json("You can only update your account")
    }

})

//delete user
userRouter.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin)
    { try{
           await User.findByIdAndDelete(req.params.id)
           res.status(200).json("Account has been deleted sucessfully !")
         }catch(err){
            return res.status(500).json(err)
         }
    }else{
       return res.status(403).json("You can only delete your account")
    }

})

//get a user
userRouter.get("/:id", async (req,res) => {
    try{
         const user = await User.findById(req.params.id)
         res.status(200).json(user)
    }catch(err){
        return res.status(500).json(err)
    }
})


//follow user
userRouter.put('/:id/follow', async (req,res) => {
    if(req.params.id != req.body.userId){
        try{ const user = await User.findById(req.params.id);
             const currentUser = await User.findById(req.body.userId);
             if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
              } else {
                return res.status(403).json("you allready follow this user");
              }
        }catch(err){
            return res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("You cannot follow yourself !")
    }
    
})


//unfollow user

userRouter.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          return res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("you cant unfollow yourself");
    }
  });




module.exports = userRouter

