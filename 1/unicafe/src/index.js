
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        keskiarvo:0,
        positiivisia: 0

      }
    }
    
    klik = (hyva, neutraali, huono) => {
        let sum = this.state.hyva + hyva + this.state.neutraali + neutraali + this.state.huono + huono;
        let avg = (this.state.hyva + hyva + (this.state.huono + huono) * (-1)) / sum;
        let pos = ((this.state.hyva + hyva) / sum) * 100;
        return () => {
            this.setState({
                hyva: this.state.hyva + hyva,
                neutraali: this.state.neutraali + neutraali,
                huono: this.state.huono + huono,
                keskiarvo: avg,
                positiivisia: pos
            })
        }
    }

    Statistics = (props) => {
        return (
            <div>
                <h1>Statistiikka</h1>
            </div>
        )
    }
    
    Statistic = () => {
        if(this.state.hyva === 0 && this.state.neutraali === 0 && this.state.huono === 0) {
            return (
                <div>
                    Ei yhtään palautetta annettu.
                </div>
            )
        }
        return (
            <table>
                <tr>
                    <td>Hyva</td> <td>{this.state.hyva}</td>
                </tr>
                <tr>
                    <td> Neutraali </td> <td>{this.state.neutraali}</td>
                </tr>
                <tr>
                    <td>Huono </td> <td>{this.state.huono} </td>
                </tr>
                <tr>
                <td>keskiarvo </td><td>{this.state.keskiarvo} </td>
                </tr>
                <tr>
                <td>positiivisia</td> <td>{this.state.positiivisia} %</td>
                </tr>
            </table>
        )
    }

    render() {
      return (
        <div>
          <div>
            <h1>Anna palauttetta</h1>
            <button onClick={this.klik(1,0,0)}>hyvä</button>
            <button onClick={this.klik(0,1,0)}>neutraali</button>
            <button onClick={this.klik(0,0,1)}>huono</button>
          </div>
          <div>
            <this.Statistics />
            <this.Statistic />
          </div>
        </div>
      )
    }
  }

  
ReactDOM.render(
  <App />,
  document.getElementById('root')
)