import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: props.blog,
      //updateBlog:props.updateBlog
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
    console.log('blog: ' ,this.props.blog.user.username)
    console.log('user', this.props.user)
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const usersBlog = {display: this.props.user.username === this.props.user.username? '' : 'none'}
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} className="nameDiv">
          <p onClick={this.toggleVisibility}>{this.state.blog.title } </p>
          {/* <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button> */}
        </div>
        <div style={showWhenVisible}  onClick={this.toggleVisibility} className="contentDiv">
          <p>{this.state.blog.title }</p>
          <p>URL: {this.state.blog.url}</p>
          <p>Likes: {this.state.blog.likes} <button onClick={this.props.updateBlog}>like</button></p>
          <p>Added by {this.state.author}</p>
          <button style ={usersBlog} onClick={this.props.deleteBlog}>Remove</button>
          {/* {this.props.children} */}
          
          {/* <button onClick={this.toggleVisibility}>cancel</button> */}
        </div>
      </div>
    )
  }
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired

}
// const Blog = ({blog, updateBlog}) => (
//   <div>
// <p>{blog.title }</p>
//           <p>URL: {blog.url}</p>
//           <p>Likes: {blog.likes} <button onClick={updateBlog}>like</button></p>
//           <p>Added by {blog.author}</p>
//   </div>  
// )

export default Blog