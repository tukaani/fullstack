const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const loginRouter = require('./controllers/login')


const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    let token
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token =  authorization.substring(7)
    } else {
        token =  null
    }

    request.token = token
    next()
}

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })
app.use(tokenExtractor)
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
//app.use(middleware.logger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)



const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}