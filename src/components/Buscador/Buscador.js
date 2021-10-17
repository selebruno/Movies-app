import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { addMovieFavorite, getMovies } from '../../actions/index.js'
import { useSelector, useDispatch } from "react-redux";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { margin } from "@mui/system";

 
const myTheme = createTheme({ 
  palette: {
    secondary: {
      main: '#2596be'
    }
  }
});

const Search = styled('div')(({ theme }) => ({ 
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


 
  

export function Buscador() {
    const [state,setState] = useState ({
      title: ""
    })
   

  const movies = useSelector(state => state.moviesLoaded)
  const dispatch = useDispatch()

  function handleChange(e) {
    setState({ title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMovies(state.title));
  }

    const { title } =state.title;
    return (
      <>
       <MuiThemeProvider theme={myTheme}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Movies App
          </Typography>  
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              type="text"
              id="title"
              autoComplete="off" 
              value={title}
              onChange={handleChange}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <Button sx={{m: "0.5rem"}} color="inherit" variant="outlined" type="submit" onClick={handleSubmit}>BUSCAR</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <ImageList sx={{ width: "90%", height: "100%", mx: "7.5rem" }}  cols={3} rowHeight={500}>
     {
       movies && movies.map(movie => (
         <ImageListItem  key={movie.imdbID}>
          <Link to={`/movie/${movie.imdbID}`}> 
            <img src={movie.Poster} style={{height: '25rem', width:"18rem"}} loading="lazy"/>
          </Link>
          <Button variant="contained" style={{width: '18rem', marginTop:"0.1rem"}} onClick={() => dispatch(addMovieFavorite(movie))}>FAV</Button>
         </ImageListItem>
       ))
     }
    </ImageList>
    </MuiThemeProvider>
    </>
  );
}
     
      
        


export default Buscador;
