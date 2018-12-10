import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if(message[0] === 'success') {
    return (
        <div className="success">
          {message[1]}
        </div>
      )
  }
  return (
    <div className="error">
      {message[1]}
    </div>
  )
}

export default Notification