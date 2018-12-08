const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1 } )
    response.json(blogs.map(Blog.format))
  })
  
blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }


    if(!request.body.title || !request.body.url) {
        return response.status(400).json({error:'title or url missing'})
    }
    
    if(!request.body.likes) {
        request.body.likes = 0
    } 
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })
    
    
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(Blog.format(result))
    
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === decodedToken.id.toString() ) {
        console.log('blog removed!')
        const result = blog.remove()
        return response.status(204).json({result:'Blog removed!'})
    }
    return response.status(403).json({ error: 'not your blog!'})
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const result = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    response.status(201).json(Blog.format(result))
})


module.exports = blogsRouter
