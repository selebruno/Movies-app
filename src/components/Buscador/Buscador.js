import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addMovieFavorite, getMovies } from '../../actions/index.js'
import './Buscador.css';

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getMovies(this.state.title);
  }

  render() {
    const { title } = this.state;
    return (
      <div className='all'>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div>
            <input
            placeholder='Pelicula...'
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul className='allMovies'>
         {
           this.props.movies && this.props.movies.map(movie => (
             <div className='each' key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <span>{movie.Title}</span>
                <img src={movie.Poster}/>
              </Link>
              <button onClick={() => this.props.addMovieFavorite(movie)}>FAV</button>
             </div>
           ))
         }
        </ul>
      </div>
    );
  }
}

// Prop
//
// {
//   movies: store.getState().moviesLoaded,
//   addMovieFavorite: (movie) => store.dispatch({type: "ADD_MOVIE_FAVORITE", payload: movie),
//   getMovies: (title) => store.dispatch({type: "GET_MOVIES", payload: objServer})
// }

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buscador);
