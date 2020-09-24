import React from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Calldata from './Calldata';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Calldata/>
      </header>
      
    </div>
  );
}

export default App;