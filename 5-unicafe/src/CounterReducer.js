const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GOOD':
        return Object.assign({}, state, {
            good: state.good + 1
        })
      case 'OK':
        return Object.assign({}, state, {
            ok: state.ok + 1
        })
      case 'BAD':
        return Object.assign({}, state, {
        bad: state.bad + 1
        }) 
      case 'ZERO':
        state = {
            good: 0,
            ok: 0,
            bad: 0
          }
          return state
        default:
          break
    }
    return state
  }
  
  export default counterReducer