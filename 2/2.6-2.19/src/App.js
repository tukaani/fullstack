import React from 'react'

import Person from './components/Person'
import numberService from './services/Numbers'


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: '',
        notification: null,
        error: null
      }
    }
    
    componentDidMount() {
        numberService
            .getAll()
            .then(response => {
                this.setState({persons: response.data})
            })
        
      }

    handleNewName = (event) => {
      this.setState({ newName: event.target.value })
    }
    handleNewNumber = (event) => {
      this.setState({ newNumber: event.target.value })
    }
  
    handleFilter = (event) => {
        this.setState({ filter:event.target.value })
    }
  
    addPerson = (event) =>{
      event.preventDefault()
      
      const result = this.state.persons.find(person => {
        if(person.name === this.state.newName){
            return person
        }  
      })
    
      if(result === undefined) {
          const personObject = {
              name: this.state.newName,
              number: this.state.newNumber
          }

          numberService
            .create(personObject)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    notification: `Lisätty ${this.state.newName}`
                })
            })
  
      } else {
        if(window.confirm(this.state.newName + ' on jo listassa, haluatko päivittää numeron?')) {
            const updatedNumber = {...result,number: this.state.newNumber}

            numberService
            .update(result.id, updatedNumber)
            .then(response => {
              this.setState({
                persons: this.state.persons.map(person => person.id !== result.id ? person : response.data),
                notification: `Muutettu ${result.name} numeroa`
              })
            })
        }
      }
    }

    del = (id) => {
        return () => {
            if(window.confirm('Olet poistamassa ' + this.state.persons[parseInt(id)-1].name)) {
                numberService
                .del(id)
                .then(response => {
                    numberService
                    .getAll()
                    .then(response => {
                      this.setState({persons: response.data, notification: `Poistettu ${this.state.persons[parseInt(id)-1].name}`})
                    })
                })
                .catch(error => {
                  this.setState({
                    error: `Henkilö '${this.state.persons[parseInt(id)-1].name}' on jo valitettavasti poistettu palvelimelta`,
                    persons: this.state.persons.filter(p => p.id !== id)
                  })
                  setTimeout(() => {
                    this.setState({error: null})
                  }, 5000)
                })
            }
        }

        
    }
  
    render() {
  
      const namesToShow = this.state.persons.filter(e => {
          return e.name.includes(this.state.filter)
      })
  
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <Notification message={this.state.notification}/>
          <Error message={this.state.error}/>
          <div>
  
              Rajaa nimia:<input 
              value={this.state.filter}
              onChange={this.handleFilter}
              />
          </div>
          <form onSubmit={this.addPerson}>
            <div>
              nimi: <input 
              value={this.state.newName} 
              onChange={this.handleNewName}
              />
            </div>
            <div>
              numero: <input 
              value={this.state.newNumber} 
              onChange={this.handleNewNumber}
              />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
          <h2>Numerot</h2>
          
            {namesToShow.map(person => <Person key={person.name} person={person} del={this.del(person.id)}/>)}
          
        </div>
      )
    }
  }
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  const Error = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  export default App