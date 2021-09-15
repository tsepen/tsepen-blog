const createPath = require('../helpers/create-path')

const Post = require('../models/post')

const handleError = (req, error) => {
  console.log(error)
}

const getHome = (req, res) => {
  const title = 'Home!'
  res.status(200).render(createPath('index'), { title })
}

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('post'), { post })
    })
    .catch((err) => console.log(err))
}

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log({ result })
      res.sendStatus(200)
    })
    .catch((err) => handleError(res, err))
}

const getEditPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('edit-post'), { post })
    })
    .catch((err) => handleError(res, err))
}

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath('posts'), { posts })
    })
    .catch((err) => handleError(res, err))
}

const getAddPost = (req, res) => {
  res.render(createPath('add-post'))
}

const addPost = (req, res) => {
  const post = new Post(req.body)

  post
    .save()
    .then((result) => {
      res.redirect('/posts')
    })
    .catch((err) => handleError(res, err))
}

const editPost = (req, res) => {
  const { title, text } = req.body
  const { id } = req.params

  Post.findByIdAndUpdate(id, { title, text })
    .then((result) => {
      console.log(result)
      res.redirect(`/posts/${id}`)
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
  getHome,
  getPost,
  deletePost,
  getPosts,
  getEditPost,
  getAddPost,
  addPost,
  editPost,
}
