import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  randomize = () => {
      return () => {
          this.setState({
              selected : Math.floor(Math.random() *5) + 1
          })
      }
  }

  vote = () => {
      const copy_votes = [...this.state.votes]
      copy_votes[this.state.selected] += 1;
        return () => {
            this.setState({
                votes: copy_votes
            })
        }
  }

  winning = () => {

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{this.props.anecdotes[this.state.votes.indexOf(Math.max(...this.state.votes))]}</p>
            <p>has {Math.max(...this.state.votes)} votes</p>
        </div>
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.randomize()}>Next anecdote</button>
        <button onClick={this.vote()}>VOTE!</button>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p> Votes: {this.state.votes[this.state.selected]} </p>
        <this.winning></this.winning>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)