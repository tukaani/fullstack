import React from 'react'
import { createNotification } from '../reducers/notificationReducer'
import { deleteNotification } from '../reducers/notificationReducer'
class AnecdoteList extends React.Component {

  vote = (anecdote) => {
    this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })
    this.props.store.dispatch(createNotification(`you voted ${anecdote.content}`))
    setTimeout(() => {
      this.props.store.dispatch(deleteNotification())
    }, 5000)
  }
  render() {
    
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filters
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.filter(anecdote => {return anecdote.content.includes(filter)}).sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.vote(anecdote)
                
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
