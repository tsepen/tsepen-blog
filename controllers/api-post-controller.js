const Post = require('../models/post')

const handleError = (req, error) => {
  res.status(500).send(error)
}

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => handleError(res, err))
}

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => console.log(err))
}

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(req.params.id)
    })
    .catch((err) => handleError(res, err))
}

const addPost = (req, res) => {
  const post = new Post(req.body)

  console.log(req)

  post
    .save()
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => handleError(res, err))
}

const editPost = (req, res) => {
  const { title, text } = req.body
  const { id } = req.params

  Post.findByIdAndUpdate(id, { title, text }, { new: true })
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
  getPost,
  deletePost,
  getPosts,
  addPost,
  editPost,
}
