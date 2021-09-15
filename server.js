const http = require('http')
const path = require('path')
const fs = require('fs')

const { connection } = require('./database')

connection.connect()

connection.query(
  'SELECT * FROM admins WHERE name="Andrey" LIMIT 100;',
  function (error, results, fields) {
    if (error) throw error

    console.log(results[0].id)
  }
)

connection.end()

const PORT = 3000

const data = [{ name: 'lomaz' }, { name: 'ota' }]

const log = (logData) => {
  fs.appendFile(
    './logs/log.txt',
    `${new Date()}: ${logData}\n`,
    (data, error) => {
      if (error) {
        console.error(error)
      }
    }
  )
}

const server = http.createServer((req, res) => {
  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

  res.setHeader('Content-type', 'text/html')

  let basePath = ''

  const url = req.url.slice(1)

  switch (url) {
    case '':
    case 'home':
    case 'index':
      basePath = createPath('index')
      break
    case '/about':
      res.statusCode = 301
      res.setHeader('Location', '/user')
      res.end()
      break
    default:
      basePath = createPath(url)
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      fs.readFile(createPath('404'), (err, d) => {
        if (err) {
          res.statusCode = 500

          res.end
        } else {
          res.statusCode = 404

          res.write(d)

          res.end()
        }
      })
    } else {
      res.write(data)

      res.end()
    }
  })

  log(req.url)
})

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log('lister...')
})
