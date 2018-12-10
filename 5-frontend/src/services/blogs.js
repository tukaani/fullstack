import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async ({blog}) => {
  const config = {
    headers : {'Authorization': token}
  }
  console.log('likeds', blog)
  const response = await axios.put(`${baseUrl}/${blog._id}`,blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers : {'Authorization': token}
  }
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}


export default { getAll, createBlog, likeBlog, deleteBlog, setToken }