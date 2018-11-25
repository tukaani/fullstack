import React from 'react'
import axios from 'axios'

// TODO
// Showing only less 10 countries based on filter is not working


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filter: '',
        filtered: [],
        currentCountry:[],
      }
    }
    
    componentDidMount() {
        console.log('did mount')
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            console.log('promise fulfilled')
            this.setState({ countries: response.data, filtered:response.data })
          })
      }
      
    
  
    handleFilter = (event) => {
      const filteredCountires = this.state.countries.filter(e => {
        return e.name.includes(event.target.value)
      })

        //this.setState({ filter:event.target.value })
        this.setState({ 
          filtered:filteredCountires,
          filter: event.target.value,
        })
    }


    render() {
      
      console.log('rende maara', this.state.filtered.length)
      if(this.state.filtered.length > 10) {
        return (
          <div>
            <h2>Puhelinluettelo</h2>
            <div>
    
                Rajaa nimia:<input 
                value={this.state.filter}
                onChange={this.handleFilter}
                />
            </div>
            <h2>Countries</h2>
              <div>Too many countries</div>
          </div>
        )
      } else if(this.state.filtered.length === 1) {
        return (
          <div>
            <h2>Puhelinluettelo</h2>
            <div>
    
                Rajaa nimia:<input 
                value={this.state.filter}
                onChange={this.handleFilter}
                />
            </div>
            <h2>Countries</h2>
              <Country country={this.state.filtered[0]}/>
          </div>
        )
      }
      else {
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <div>
  
              Rajaa nimia:<input 
              value={this.state.filter}
              onChange={this.handleFilter}
              />
          </div>
          <h2>Countries</h2>
            <Filter countries={this.state.filtered}/>
            
          
        </div>
      )
      }
    }
  }

  
   
    
  const Country = ({country}) => {
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <img src={country.flag} alt="country"/>
      </div>
    )
  }
  
  const Filter = (props) => {
    return (
      <div>
        {props.countries.map(country => <p>  {country.name} </p>)}
      </div>
    )
   
    
  }
  export default App