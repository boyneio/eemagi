import React from "react";
import "./App.css";
import { Photo, User } from "./types";
import API from "./api";

function App() {
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  React.useEffect(() => {
    API.get("photos").then((res) => setPhotos(res.data));
  }, []);
  return (
    <div className="App">
      {photos.map((p) => {
        return (
          <div key={p.id}>
            <img src={p.thumbnailUrl} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
