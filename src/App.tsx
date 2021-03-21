import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { User } from './types';

const base = process.env.REACT_APP_API_URL;
console.log(base);

const api = axios.create({baseURL: base});

function App() {
  const [users, setUsers] = React.useState<User[]>();
  React.useEffect(() => {
    api.get('user').then(res => setUsers([res.data]));
  }, []);
  return (
    <div className="App">
      {users?.map(u => (<h5>{u.firstName}</h5>))}
    </div>
  );
}

export default App;
