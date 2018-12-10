import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import CounterReducer from './CounterReducer'

const store = createStore(CounterReducer)


const Statistiikka = () => {
  let palautteita = false
  console.log('perse')
  const palautteet = store.getState()
  console.log(palautteet)
  for (let key in palautteet) {
      if(palautteet[key] !== 0){
          palautteita = true
          console.log('palasd', palautteita)
      }
    
  }
  if (!palautteita) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteet['good']}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteet['ok']}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteet['bad']}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{(( palautteet['good']) / (Object.values(palautteet).reduce((a, b) => a + b))) * 100}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        {/* <button onClick={this.klik('GOOD')}>hyvä</button> */}
        <button onClick={e => store.dispatch({ type: 'GOOD'})}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD'})}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}


const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  
renderApp()
store.subscribe(renderApp)
