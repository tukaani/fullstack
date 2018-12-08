const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    return blogs.reduce((acc, obj) => (acc + obj.likes),0)
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current
    }) 

    return max
}

const mostBlogs = (blogs) => {
    
    let occurence = new Array(blogs.length).fill(0);

    for(let i = 0;i<blogs.length;i++) {
        for(let j = 0;j<blogs.length;j++) {
            if(blogs[i].author === blogs[j].author) {
                occurence[i] += 1
            }
        }
    }

    const amount = Math.max(...occurence)
    const i = occurence.indexOf(Math.max(...occurence));

    return {
            author: blogs[i].author,
            blogs: amount
            }

}

const mostLikes = (blogs) => {

    let occurence = new Array(blogs.length).fill(0);

    for(let i = 0;i<blogs.length;i++) {
        for(let j = 0;j<blogs.length;j++) {
            if(blogs[i].author === blogs[j].author) {
                occurence[i] += blogs[j].likes
            }
        }
    }
    
    const amount = Math.max(...occurence)
    const i = occurence.indexOf(Math.max(...occurence));

    return {
            author: blogs[i].author,
            likes: amount
            }

}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs

}

const usersInDb = async () => {
    const users = await User.find({})
    return users

}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
    usersInDb
}