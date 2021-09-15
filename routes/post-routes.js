const express = require('express')
const router = express.Router()

const {
  getHome,
  getPost,
  deletePost,
  getEditPost,
  getPosts,
  getAddPost,
  addPost,
  editPost,
} = require('../controllers/post-controller')

router.get('/', getHome)

router.get('/posts/:id', getPost)

router.delete('/posts/:id', deletePost)

router.get('/edit/:id', getEditPost)

router.get('/posts', getPosts)

router.get('/add-post', getAddPost)

router.post('/add-post', addPost)

router.put('/edit/:id', editPost)

module.exports = router
