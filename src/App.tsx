import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { User } from './types';

const base = process.env.REACT_APP_API_URL;
console.log(base);

const api = axios.create({baseURL: base});

function App() {

  return (
    <div className="App">
      <img src={`${base}photos/1?mini=true`} />
    </div>
  );
}

export default App;
