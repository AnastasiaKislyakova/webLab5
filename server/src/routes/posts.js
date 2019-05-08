const express = require('express')
const router = express.Router()
const Post = require('../models/post-model')

router.post('/posts', (req, res) => {
  const post = new Post({
    name: req.body.name,
    content: req.body.content
  })
  post.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: 'Post with ID_${data._id} saved successfully!'
      })
    }
  })
})

router.get('/posts', (req, res) => {
  Post.find({}, 'name content', (err, posts) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ posts: posts })
    }
  }).sort({ _id: -1 })
})

router.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'name content', (err, post) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(post)
    }
  })
})

router.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'name content', (err, post) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.name) {
        post.name = req.body.name
      }
      if (req.body.content) {
        post.content = req.body.content
      }
      post.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

router.delete('/posts/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router
