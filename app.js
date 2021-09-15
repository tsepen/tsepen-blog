const express = require('express')
const path = require('path')
const chalk = require('chalk')
const morgan = require('morgan')
const fs = require('fs')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const createPath = require('./helpers/create-path')

require('dotEnv').config()

const postRoutes = require('./routes/post-routes')
const apiPostRoutes = require('./routes/api-post-routes')

const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white

const db = process.env.MONGO_URL

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(successMsg('connect db...'))
  })
  .catch((err) => console.error(err))

const app = express()

app.set('view engine', 'ejs')

const PORT = process.env.PORT

app.listen(PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg('listen...'))
})

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
)

app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(postRoutes)

app.use(apiPostRoutes)

app.use((req, res) => {
  const title = '404!'
  res.status(404).render(createPath('404'), { title })
})
