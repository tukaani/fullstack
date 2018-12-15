
const initalState = ''

const noteReducer = (state = initalState, action) => {
  switch(action.type) {
  case 'NEW':
    return action.content
    // console.log('content ', action.content)
   // return Object.assign('', state, action.content)
    // //return state
  case 'DELETE':
    return ''
  default:
    return state
  }

}

export const createNotification = (content) => {
  return {
    type: 'NEW',
    content
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE'
  }
}

export default noteReducer