import React from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../../actions/index';


class Movie extends React.Component {
  componentDidMount() {
    const movieId = this.props.match.params.id;
    this.props.getDetail(movieId);
  }

  render() {
      return (
          <div className="container">
          {
            this.props.loading ? <h2>Cargando</h2> :
            <div className='movie'>
              <h2 >{this.props.movie.Title}</h2>
              <h4>{this.props.movie.Year}</h4>
              <h4>{this.props.movie.Plot}</h4>
              <img src={this.props.movie.Poster}/>
            </div>
          }
          </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movieDetail,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetail: idMovie => dispatch(getMovieDetail(idMovie))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
