import React from "react";

import Favorites from "./components/Favorites/Favorites";
import Buscador from "./components/Buscador/Buscador";
import { Route } from "react-router-dom";
import Movie from "./components/Movie/Movie";

function App() {
  return (
      <React.Fragment>  
          <Route exact path="/" component={Buscador} />
          <Route path="/favs" component={Favorites} />
          <Route path="/movie/:id" component={Movie} />
      </React.Fragment>
  );
}

export default App;
