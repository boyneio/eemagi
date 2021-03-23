import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Photo, User } from './types';

const base = process.env.REACT_APP_API_URL;
console.log(base);

const api = axios.create({baseURL: base});

function App() {
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  React.useEffect(() => {
    api.get('photos').then(res => setPhotos(res.data));
  }, []);
  return (
    <div className="App">
      {photos.map(p => {
        return (
          <div key={p.id}>
            <img src={p.thumbnailUrl} />
          </div>
        )
      })}
    </div>
  );
}

export default App;
