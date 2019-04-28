import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const data = require('./data.json') // Käytetty data-aineisto

  // Hookit eli tässä tapauksessa boolean-tilat eri vastausvaihtoehdoille.
  // Oletuksena false joka ei suodata mitään.
  // Pois lukien nimihaun tila, joka on tyhjä string.
  const [candidateName, setCandidateName] = useState("")
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

  // Suodatetaan dataa lukijan valitsemilla muuttujilla.
  // Jos true, suodatetaan valinnan mukaan. Jos false, ei suodateta mitään.
  // Oletuksena siis näkyy kaikki nimet.
  // Ekana tekstihaku nimille, sitten booleanit: sukupuoli, ikä, kieli ja koulutus.
  const filteredCandidates = data
  .filter(d => 
    d.firstName.toLowerCase().includes(candidateName.toLowerCase()) || 
    d.lastName.toLowerCase().includes(candidateName.toLowerCase()))
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

  //Funktio nollaamaan lukijan tekemät valinnat
  // -> kaikki tilat falseiksi ja nimi tyhjäksi stringiksi
  const reset = () => {
    return () => {
        setCandidateName("")
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

      <div className="beginning">
        <h1>Kaltaisesi</h1>
        <p className="lead">Kuinka moni vastavalitun eduskunnan 200 kansanedustajasta muistuttaa sinua? Vastaa kysymyksiin ja katso tulos.</p>
      </div>
      <hr/>

      <div className="interactive">

        <div className="selections">
          <h2>Kerro itsestäsi</h2>
          <p>Vastaa niin moneen kohtaan kuin haluat. Jos et vastaa yhteenkään, voit tarkastella kaikkia uusia kansanedustajia <a className="ankkuri" href="#tulos">oheisesta listasta</a>. Emme tallenna vastauksia tai kerää sinusta dataa.</p>

          <h3>Sukupuoli</h3>
          <Button class={male ? 'active' : 'passive'} 
                  filter={() => setMale(!male)} 
                  buttonText={'mies'} />
          <Button class={female ? 'active' : 'passive'} 
                  filter={() => setFemale(!female)} 
                  buttonText={'nainen'} />

          <h3>Ikä</h3>
          <Button class={young ? 'active' : 'passive'} 
                  filter={() => setYoung(!young)} 
                  buttonText={'alle 35'} />
          <Button class={middleAge ? 'active' : 'passive'} 
                  filter={() => setMiddleAge(!middleAge)} 
                  buttonText={'35 - 50'} />
          <Button class={old ? 'active' : 'passive'} 
                  filter={() => setOld(!old)} 
                  buttonText={'yli 50'} />

          <h3>Kieli</h3>
          <Button class={fin ? 'active' : 'passive'} 
                  filter={() => setFin(!fin)} 
                  buttonText={'suomi'} />
          <Button class={sve ? 'active' : 'passive'} 
                  filter={() => setSve(!sve)} 
                  buttonText={'ruotsi'} />

          <h3>Koulutustaso</h3>
          <Button class={peruskoulu ? 'active' : 'passive'} 
                  filter={() => setPeruskoulu(!peruskoulu)} 
                  buttonText={'peruskoulu'} />
          <Button class={ammattikoulu ? 'active' : 'passive'} 
                  filter={() => setAmmattikoulu(!ammattikoulu)} 
                  buttonText={'ammattikoulu'} />
          <Button class={lukio ? 'active' : 'passive'} 
                  filter={() => setLukio(!lukio)} 
                  buttonText={'lukio'} />
          <Button class={korkeakoulu ? 'active' : 'passive'} 
                  filter={() => setKorkeakoulu(!korkeakoulu)} 
                  buttonText={'korkeakoulu'} />

          <h3>Etu- tai sukunimi</h3>
          <Filter onTextChange={text => setCandidateName(text)}/>
          
          <small>Vastausvaihtoehdot perustuvat kansanedustajien tietoihin. Esimerkiksi muita kieliä ei valinnoissa ole, koska edustajista kaikki ovat suomen- tai ruotsinkielisiä tai tieto puuttuu.</small>

          <h3>- - -</h3>
          <Button class="resetButton" 
                  filter={reset()} 
                  buttonText="Tyhjennä kaikki valintasi"/>

        </div>

        <div id="tulos" className="results">

          <div className="kaltaisesi">
            <h2>Sinua muistuttavia kansanedustajia ovat:</h2>
            <p className="total">Yhteensä <span className="invert">{filteredCandidates.length}</span> kansanedustajaa</p>

            <ul>
              {filteredCandidates.map(d => {
                if (d.memberOfParliament === false) {
                  return (
                    <li className="uusi" key={Math.random(21)}>
                        <b>{d.firstName} {d.lastName}</b>, {d.age}, {d.abbr}<br/>
                        <span className="occupation">{d.occupation}</span>
                    </li>
                  )
                }
                else {
                  return (
                    <li key={Math.random(42)}>
                      <b>{d.firstName} {d.lastName}</b>, {d.age}, {d.abbr}<br/>
                      <span className="occupation">{d.occupation}</span>
                    </li>
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
    <button className={props.class} onClick={props.filter}>{props.buttonText}</button>
    </>
  )
}


// Renderöintikomento
ReactDOM.render(<App />, document.getElementById('root'));