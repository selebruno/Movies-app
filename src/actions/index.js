export function addMovieFavorite(payload) { // payload --> obj que representa una movie
  return { type: "ADD_MOVIE_FAVORITE", payload };
}

export function removeMovieFavorite(id) { // payload --> id representa una movie
  return { type: "REMOVE_MOVIE_FAVORITE", payload: id };
}

export function getMovies(titulo) { // buscador --> avengers
  return function(dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
      .then(response => response.json())
      .then(obj => {
        dispatch({ type: "GET_MOVIES", payload: obj });
      });
  };
}

export function getMovieDetail(id) { // click movie --> id
  return function(dispatch) {
    dispatch({type: "LOADING"});
    return fetch("http://www.omdbapi.com/?apikey=20dac387&i=" + id)
      .then(response => response.json())
      .then(obj => {
        dispatch({ type: "GET_MOVIE_DETAIL", payload: obj });
      });
  };
}
