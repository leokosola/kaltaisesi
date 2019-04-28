import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const App = () => {
  const data = require('./data.json')

  const [filterString, setFilterString] = useState("")
  const [education, setEducation] = useState(0)

  const [male, setMale] = useState(false)
  const [female, setFemale] = useState(false)
  const [young, setYoung] = useState(false)
  const [middleAge, setMiddleAge] = useState(false)
  const [old, setOld] = useState(false)
  const [fin, setFin] = useState(false)
  const [sve, setSve] = useState(false)
  const [peruskoulu, setPeruskoulu] = useState(false)
  const [ammattikoulu, setAmmattikoulu] = useState(false)
  const [lukio, setLukio] = useState(false)
  const [korkeakoulu, setKorkeakoulu] = useState(false)

  // Suodatetaan data-aineistoa muuttujaan
  const filteredCandidates = data
  // Jos lukija kirjoittaa nimensä, etsi datasta tyypit, joiden nimestä löytyy syötetty merkkijono
  .filter(d => 
    d.firstName.toLowerCase().includes(filterString.toLowerCase()) || 
    d.lastName.toLowerCase().includes(filterString.toLowerCase()))
  .filter (d => {
    if (education === 0) {
      return d.education !== education
      } 
      else {
        return d.education === education
      }
  })
  // Jos lukija klikkaa nappia x, suodata datasta tähän valintaan sopivat tyypit
  .filter (d => male ? d.gender === 1 : d.gender)
  .filter (d => female ? d.gender === 2 : d.gender)
  .filter (d => young ? d.age < 35 : d.age)
  .filter (d => middleAge ? d.age >= 35 && d.age <= 50 : d.age)
  .filter (d => old ? d.age >= 50 : d.age)
  .filter (d => fin ? d.language === "Suomi" : d.language)
  .filter (d => sve ? d.language === "Ruotsi" : d.language)
  .filter (d => peruskoulu ? d.education === "peruskoulu" : d.education)
  .filter (d => ammattikoulu ? d.education === "ammattitutkinto" : d.education)
  .filter (d => lukio ? d.education === "ylioppilas" : d.education)
  .filter (d => korkeakoulu ? d.education === "korkeakoulututkinto" : d.education)

  //Nollaa lukijan tekemät valinnat -> kaikki tilat falseiksi
  const reset = () => {
    return () => {
        setFilterString("")
        setMale(false)
        setFemale(false)
        setYoung(false)
        setMiddleAge(false)
        setOld(false)
        setFin(false)
        setSve(false)
        setPeruskoulu(false)
        setAmmattikoulu(false)
        setLukio(false)
        setKorkeakoulu(false)
    }
  }

  // Sivulle renderöityvät elementit
  return (
    <div className="wrapper">
      <div className="aloitus">
        <h1>Kaltaisesi</h1>
        <p className="lead">Tähän ingressi</p>
      </div>
      <div className="interactive">
        <div className="valinnat">
          <h2>Kerro itsestäsi</h2>
          <h3>Sukupuoli</h3>
          <Button class={male ? 'aktiivinen' : 'passiivinen' } suodatin={() => setMale(!male)} buttonText={'mies'} />
          <Button class={female ? 'aktiivinen' : 'passiivinen' } suodatin={() => setFemale(!female)} buttonText={'nainen'} />

          <h3>Ikä</h3>
          <Button class={young ? 'aktiivinen' : 'passiivinen' } suodatin={() => setYoung(!young)} buttonText={'alle 35'} />
          <Button class={middleAge ? 'aktiivinen' : 'passiivinen' } suodatin={() => setMiddleAge(!middleAge)} buttonText={'35 - 50'} />
          <Button class={old ? 'aktiivinen' : 'passiivinen' } suodatin={() => setOld(!old)} buttonText={'yli 50'} />

          <h3>Kieli</h3>
          <Button class={fin ? 'aktiivinen' : 'passiivinen'} suodatin={() => setFin(!fin)} buttonText={'suomi'} />
          <Button class={sve ? 'aktiivinen' : 'passiivinen'} suodatin={() => setSve(!sve)} buttonText={'ruotsi'} />

          <h3>Koulutustaso</h3>
          <Button class={peruskoulu ? 'aktiivinen' : 'passiivinen'} suodatin={() => setPeruskoulu(!peruskoulu)} buttonText={'peruskoulu'} />
          <Button class={ammattikoulu ? 'aktiivinen' : 'passiivinen'} suodatin={() => setAmmattikoulu(!ammattikoulu)} buttonText={'ammattikoulu'} />
          <Button class={lukio ? 'aktiivinen' : 'passiivinen'} suodatin={() => setLukio(!lukio)} buttonText={'lukio'} />
          <Button class={korkeakoulu ? 'aktiivinen' : 'passiivinen'} suodatin={() => setKorkeakoulu(!korkeakoulu)} buttonText={'korkeakoulu'} />

          <h3>Etu- tai sukunimi</h3>
          <Filter onTextChange={text => setFilterString(text)}/>

          <h3>- - -</h3>
          <Button class="resetBtn" suodatin={reset()} buttonText="Poista kaikki valintasi"/>

        </div>
        <div className="tulokset">
          <div className="kaltaisesi">
            <h2>Kaltaisesi edustajat</h2>
            <p className="yhteensä">Yhteensä <span className="invert">{filteredCandidates.length}</span> kansanedustajaa</p>
            <ul>
              {filteredCandidates.map(d => {
                if (d.memberOfParliament === false) {
                  return (
                    <li className="uusi" key={Math.random(21)}><b>{d.firstName} {d.lastName}</b>, {d.age}, {d.abbr}<br/><span className="ammatti">{d.occupation}</span></li>
                  )
                }
                else {
                  return (
                    <li key={Math.random(42)}><b>{d.firstName} {d.lastName}</b>, {d.age}, {d.abbr}<br/><span className="ammatti">{d.occupation}</span></li>
                  )
                }
              } 
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Input-komponentti hakuja kuten etunimeä varten
const Filter = (props) => {
  return (
    <>
    <input type="text" onChange={event => 
    props.onTextChange(event.target.value) }/>
    </>

  )
}

// Nappi-komponentti - tyyli class, klikkauseventti, ja napin teksti ovat dynaamisia
const Button = (props) => {
  return (
    <>
    <button className={props.class} onClick={props.suodatin}>{props.buttonText}</button>
    </>
  )
}


// Renderöintikomento
ReactDOM.render(<App />, document.getElementById('root'));