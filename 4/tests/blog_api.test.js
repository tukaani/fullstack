const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)
const listHelper = require('../utils/list_helper')


const initialBlogs = [{
    title: 'Jacks',
    author: 'Dad',
    url: 'www.google.com',
    likes: 1
}]

beforeAll(async () => {
    await Blog.remove({})
  
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Add new blog', async () => {
    const blogsBefore = await listHelper.blogsInDb()

    const newBlog = {
        title: 'jee',
        author: 'asd',
        url: 'www.evli.com',
        likes: 666
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
   
    const titles = response.body.map(r => r.title)
    

    expect(response.body.length).toBe(blogsBefore.length + 1)
    expect(titles).toContain('jee')

})

test('empty likes', async () => {
    const newBlog = {
        title: 'jee',
        author: 'asd',
        url: 'www.evli.com'
        
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toEqual(0)
    
})

test('without title and url', async () => {
    const newBlog = {
        author: 'asd',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    
})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
        title: 'delete',
        url: 'delete',
        author: 'delete',
        likes: 666
        
      })
      await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await listHelper.blogsInDb()

      await api
        .delete(`/api/blogs/${addedBlog._id}`)
        .expect(204)

      const blogsAfterOperation = await listHelper.blogsInDb()

      
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
})

describe('update blog', async () => {
    test('PUT /api/blogs/:id succeeds with proper statuscode', async () => {
        const updatedBlog = {
            title: 'Jacks',
            url: 'asd',
            author: 'put',
            likes: 111
        }
    const blogsAtStart = await listHelper.blogsInDb()
      const response = await api
        .put(`/api/blogs/${blogsAtStart[0]._id}`)
        .send(updatedBlog)
        .expect(201)

      expect(response.body.likes).toEqual(111)
    })
})

afterAll(() => {
  server.close()
})