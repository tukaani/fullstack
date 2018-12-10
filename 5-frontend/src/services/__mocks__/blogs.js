let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    author: "HTML on helppoa",
    url: "2017-12-28T16:38:15.541Z",
    title: 'asd',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  
]

const getAll = () => {
  return Promise.resolve(blogs)
}
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }