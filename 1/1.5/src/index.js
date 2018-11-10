
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
    return (
        <div>
          <h1>{props.nimi}</h1>
        </div>
      )
}

const Sisalto = (props) => {
    return (
        <div>
            <p> {props.osat[0].nimi} {props.osat[0].tehtavia} </p>
            <p> {props.osat[1].nimi} {props.osat[1].tehtavia} </p>
            <p> {props.osat[2].nimi} {props.osat[2].tehtavia} </p>
        </div>
      )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
        </div>
      )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)