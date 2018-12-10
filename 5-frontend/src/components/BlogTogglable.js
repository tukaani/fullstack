import React from 'react'

class BlogTogglable extends React.Component {
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
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <p onClick={this.toggleVisibility}>{this.state.blog.title } </p>
          {/* <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button> */}
        </div>
        <div style={showWhenVisible}  onClick={this.toggleVisibility}>
          {/* <p>{this.state.blog.title }</p>
          <p>URL: {this.state.blog.url}</p>
          <p>Likes: {this.state.blog.likes} <button onClick={this.props.updateBlog.bind(this.props.blog)}>like</button></p>
          <p>Added by {this.state.author}</p> */}
          { this.props.children} 
          
          {/* <button onClick={this.toggleVisibility}>cancel</button> */}
        </div>
      </div>
    )
  }
}
export default BlogTogglable