import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const App = () => {
  const data = require('./data.json')
  const [ filterString, setFilterString ] = useState("")
  const filteredCandidates = data
  .filter(d => 
    d.firstName.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      <h2>Hae ehdokasta etunimellä</h2>
      <Filter onTextChange={text => 
        setFilterString(text)}/>
      <ul>
        {filteredCandidates.map(d => {
          if (d.memberOfParliament === false) {
            return (
              <li className="uusi">{d.firstName} {d.lastName}, {d.age}, {d.abbr}<br/><span className="ammatti">{d.occupation}</span></li>
            )
          }
          else {
            return (
              <li>{d.firstName} {d.lastName}, {d.age}, {d.abbr}<br/><span className="ammatti">{d.occupation}</span></li>
            )
          }
        } 
        )}
      </ul>
    </div>
  )
}

const Filter = (props) => {
  return (
    <>
    <input type="text" onKeyUp={event => 
    props.onTextChange(event.target.value) }/>
    </>

  )
}



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
