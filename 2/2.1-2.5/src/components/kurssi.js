import React from 'react'

const Kurssi = ({kurssi}) => {
    //const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const initialValue = 0
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
            {kurssi.osat.map(osa=>
                <p key={osa.nimi}>{osa.nimi} {osa.tehtavia}</p>
                )}
            <p>Yhteensä {kurssi.osat.reduce((total,amount) => total + amount.tehtavia, initialValue)
            }</p>
        </div>
    )
}

export default Kurssi