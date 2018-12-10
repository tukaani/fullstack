import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: ''
    }
  }

  newAnecdote = (event) => {
    event.preventDefault()
    return this.props.store.dispatch({ type: 'NEW', data: this.state.newAnecdote})
  }

  handleAnecdoteChange = (event) => {
    this.setState({newAnecdote:event.target.value})
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch({ type: 'VOTE', id: anecdote.id})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input type="text" name="anecdote" onChange={this.handleAnecdoteChange} /></div>
          <button onClick={this.newAnecdote}>create</button> 
        </form>
      </div>
    )
  }
}

export default App