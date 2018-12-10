import React from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({handleSubmit, handleChange, title, author, url}) => {
return (
    <div>
      <h2>Create new blog</h2>
  
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      </div>
  )
}
BlogForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired

}
export default BlogForm