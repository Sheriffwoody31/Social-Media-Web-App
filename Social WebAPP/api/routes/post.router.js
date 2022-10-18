const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post.model')
const User = require('../models/users.model')

//create a post

  postRouter.post("/", async (req, res) => {
    try {
      const savedPost = await Post.create(req.body)
      return res.status(200).json(savedPost)
    } catch (err) {
      return res.status(500).json(err)
    }
  })

  //update a post
  
  postRouter.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (post.userId === req.body.userId) {
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
        return res.status(200).json("the post has been updated")
      } else {
        return res.status(403).json("you can update only your post")
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  })


  //delete a post
  
  postRouter.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (post.userId === req.body.userId) {
        await Post.findByIdAndDelete(req.params.id) 
        return res.status(200).json("the post has been deleted")
      } else {
        return res.status(403).json("you can delete only your post")
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  })


  //like / dislike a post
  
  postRouter.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } }) //update can be used 
        return res.status(200).json("The post has been liked")
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } })
        return res.status(200).json("The post has been disliked")
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  })


  //get a post
  
  postRouter.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      return res.status(200).json(post)
    } catch (err) {
      return res.status(500).json(err)
    }
  })
  

  //get timeline posts
  
  postRouter.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId)
      const userPosts = await Post.find({ userId: currentUser._id })
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId })
        })
      )
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  module.exports = postRouter;