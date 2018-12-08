if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  let port = process.env.PORT
  let mongoUrl = process.env.MONGODB_URI
  console.log('Running in test', process.env.NODE_ENV, '???')
  if (process.env.NODE_ENV === 'test') {
      
    port = process.env.TEST_PORT
    mongoUrl = process.env.TEST_MONGODB_URI
    SECRET = process.env.SECRET
  }
  
  module.exports = {
    mongoUrl,
    port
  }