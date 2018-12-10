import React from 'react'
import Blog from './components/Blog'
import BlogTogglable from './components/BlogTogglable'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title:'',
      author:'',
      url:'',
      notification: null,
      updatedBlog: '',
      likedBlog:null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('didmoutn ', window.localStorage)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 
  
  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user})
      

    } catch(exception) {
      this.setState({
        notification: ['error', 'käyttäjätunnus tai salasana virheellinen'],
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    }
  }
  
  newBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.createBlog({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.setState({title: '', author: '', url:'', blogs:this.state.blogs.concat(addedBlog), 
      notification: ['success',`a new blog ${addedBlog.title} by ${addedBlog.author} added!`]})
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
      // const blogs = await blogService.getAll()
      // this.setState({blogs:blogs})
    } catch(exception) {
        this.setState({notification: ['error', 'Something went wrong :(']})
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
    }
  }

  // sortBlogs = () => {
  //   const sorted = this.state.blogs.sort
  // }

  updateBlog =  (blog) => {
    
    return async () => {
      console.log('want likes!!', blog)
      const newLikes = blog.likes += 1
      blog.likes = newLikes
      const likedBlog = await blogService.likeBlog({blog})
      this.setState({
        blogs: this.state.blogs.map(blog => blog._id !== likedBlog._id ? blog : likedBlog)
        
      })

    }
  }

  deleteBlog = (blog) => {
    return async () => {
      if (window.confirm('About to remove ' + blog.title)) {
        const deletedBlog = await blogService.deleteBlog(blog)
        const result = await blogService.getAll()
        this.setState({blogs:result})
      }
      
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ username: '', password: '', user:null})
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  handleBlogFieldChange = (event) => {
    if (event.target.name === 'title') {
      this.setState({ title: event.target.value })
    } else if (event.target.name === 'author') {
      this.setState({ author: event.target.value })
    } else if (event.target.name === 'url') {
      this.setState({ url:event.target.value})
    }
  }
  
  // handleLikes = (event) => {
  //   this.setState({likedBlog: event.target.value})
  // }

  render() {
    const loginForm = () => (
      <div>
        <h2 className="loginDiv">Kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const noteForm = () => (
      <div>
        <h2>Luo uusi muistiinpano</h2>
    
        <form onSubmit={this.addNote}>
          <input
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )

    const blogs = () => (
      
      <div>
      <h2>blogs</h2>
      {this.state.blogs.map(blog => 
        
        <Blog key={blog._id}  blog={blog} user={this.state.user} updateBlog={this.updateBlog(blog)} deleteBlog={this.deleteBlog(blog)}/>
        
      )}
      </div>
    )
    const blogForm = () => (
      <Togglable buttonLabel="new note" className="newNote">
        <BlogForm
          handleSubmit={this.newBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleBlogFieldChange}
        />
      </Togglable>
    )
    
    // const BlogFrom = () => (
    //   <div>
    //     <h2>Create new blog</h2>
    
    //     <form onSubmit={this.newBlog}>
    //       <div>
    //         Title
    //         <input
    //           type="text"
    //           name="title"
    //           value={this.state.title}
    //           onChange={this.handleBlogFieldChange}
    //         />
    //       </div>
    //       <div>
    //         Author
    //         <input
    //           type="text"
    //           name="author"
    //           value={this.state.author}
    //           onChange={this.handleBlogFieldChange}
    //         />
    //       </div>
    //       <div>
    //         url
    //         <input
    //           type="text"
    //           name="url"
    //           value={this.state.url}
    //           onChange={this.handleBlogFieldChange}
    //         />
    //       </div>
    //       <button type="submit">Create</button>
    //     </form>
    //     </div>
    // )
      console.log('user' ,this.state.user)
    return (
      <div>
          <Notification message={this.state.notification} />

         {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>Log out</button></p>
            {blogForm()}
            {blogs()}
          </div>
        }

       
      </div>
    );
  }
}



export default App;
