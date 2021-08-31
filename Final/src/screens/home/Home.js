import React, { useEffect, useState, Fragment } from "react";
import { Card, CardContent, Typography, GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { FormControl,Input,InputLabel,TextField } from "@material-ui/core";
import { Select,MenuItem,Checkbox,ListItemText,Button } from "@material-ui/core";
import './Home.css';
import Header from "../../common/header/Header";
import HomepageHeader from "../../common/header/HomepageHeader";

function Home(props) {
  // States required to render Upcoming-Movies, and Filter Form which renders Released-Movies accordingly 
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [filteredMovieName, setFilteredMovieName] = useState('');
  const [filteredGenreArray,setFilteredGenreArray] = useState([]);
  const [genreObjectArray,setGenreObjectArray] = useState([]);
  const [artistObjectArray,setArtistObjectArray] = useState([]);
  const [filteredArtistArray,setFilteredArtistArray] = useState([]);
  const [filteredStartDate,setFilteredStartDate] = useState('');
  const [filteredEndDate,setFilteredEndDate] = useState('');
  const [releasedMoviesCopy,setReleasedMoviesCopy] = useState([]);
  // Destructuring props passed from controller
  const { baseUrl } = props;
  const history = props.history;
  //Initializing theme with default MUI theme for use in Filter Form styling 
  const theme = createMuiTheme({
    typography: {
    useNextVariants: true,
  },
});
  //  Common style for every component in FilterForm to be used, stored in this variable.
  const commonFilterStyle = {
      margin : theme.spacing.unit,
      minWidth : 240,
      maxWidth : 240,
  }
  // style exclusive to Filter Title
  const filterTitleStyle = {
      color: theme.palette.primary.light
  }
  //fetch PUBLISHED movies and store in upcomingMovies
  useEffect(() => {
    fetch(baseUrl + "/movies?page=1&status=PUBLISHED")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const moviesArray = data.movies;
        setUpcomingMovies(moviesArray);
      });
  }, []);
  //fetch RELEASED movies and store in releasedMovies
  useEffect(() => {
    fetch(baseUrl + "/movies?page=1&status=RELEASED")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const moviesArray = data.movies;
        setReleasedMoviesCopy(moviesArray);
        setReleasedMovies(moviesArray);
      });
  }, []);
  //fetch all genre's and store in genreObjectArray
  useEffect(() => {
    fetch(baseUrl + "/genres")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const genreObjectArray = data.genres;
        setGenreObjectArray(genreObjectArray);
      });
  }, []);
  // fetch all artists and store in artistObjectArray
  useEffect(() => {
    fetch(baseUrl + "/artists")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const artistObjectArray = data.artists;
        setArtistObjectArray(artistObjectArray);
      });
  }, []);
  
  //Redirect to Details page when RELEASED movie clicked.
  function movieClickHandler(movie_id){
      history.push('/movie/' + movie_id);
  }
  //Function to Apply filters selected in form and render released movies accordingly
  function filterFormHandler(){
    let filteredReleasedMovies = releasedMoviesCopy;
      //Filter first by Movie Name filled in form, and store result in 'filteredReleasedMovies'
      if(filteredMovieName !== ''){
        filteredReleasedMovies = filteredReleasedMovies.filter((releasedMovie)=>{
          return (releasedMovie.title === filteredMovieName);
       })
      }
      // Filter next by Genre's selected in form, and store result in 'filteredReleasedMovies'
      if(filteredGenreArray!==[]){
        filteredReleasedMovies = filteredReleasedMovies.filter((releasedMovie)=>{
          const genreArray = releasedMovie.genres;
          let check = filteredGenreArray.every((genre) => {
            return genreArray.indexOf(genre) !== -1;
          });
          return check;
        })
      }
      //Filter next by Artist's selected in form, and store result in 'filteredReleasedMovies'
      if(filteredArtistArray!==[]){
        filteredReleasedMovies = filteredReleasedMovies.filter((releasedMovie)=>{
          const artistArray = releasedMovie.artists;
          let check = filteredArtistArray.every((artistName) => {
              let firstNameStopIndex = artistName.indexOf(' ');
              let firstName = artistName.substr(0,firstNameStopIndex);
              let lastName = artistName.substr(firstNameStopIndex+1)
              return artistArray.some((artist)=>{
                return (artist.first_name === firstName && artist.last_name === lastName)
              })
          });
          return check;
        })
      }
      /* So far, we didn't query the server to filter, and made use of the fetched details at the initial redering of page
         So the RELEASED MOVIES will get filtered and rendered without an internet connection after the loading of page if no filter 
         on Release Dates is applied. However, it is not possible to get start and End dates without querying.So these must be fetched*/
    let movieQuery = baseUrl + "movies?status=RELEASED";
    if(filteredStartDate !== ''){
        movieQuery = movieQuery + "&start_date=" + filteredStartDate;
      }
    if(filteredEndDate !== ''){
       movieQuery = movieQuery + "&end_date=" + filteredEndDate;
      }

      fetch(movieQuery)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const moviesArray = data.movies;
        filteredReleasedMovies = filteredReleasedMovies.filter((filteredMovie)=>{
         return moviesArray.some((movie)=>{
            return (movie.id === filteredMovie.id)
          });
        });
        setReleasedMovies(filteredReleasedMovies);  // Set the resultant filtered Released Movie array with the filters applied so far.
      });
}

  return (
    <Fragment>
      <Header baseUrl={baseUrl} />
      <HomepageHeader />
      {/* UPCOMING MOVIES GRID */}
      <GridList cellHeight = {250} cols= {6} style ={{flexWrap : "nowrap"}} >
        {upcomingMovies.map((movie) => (
          <GridListTile key={movie.id} >
            <img src={movie.poster_url} alt={movie.title}  />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
        {/* RELEASED MOVIES AND FILTER FORM CONTAINER */}
      <div className = "flex-container">
          {/* RELEASED MOVIES GRID */}
          <div className = "released-movies-section" style ={{width : 0.76*document.documentElement.scrollWidth}}>
             <GridList cellHeight = {350} cols= {4} >
                {releasedMovies.map((movie) => (
                    <GridListTile key={movie.id} >
                        <img src={movie.poster_url} alt={movie.title} style ={{cursor:"pointer"}} onClick ={()=>{movieClickHandler(movie.id)}} />
                        <GridListTileBar title={movie.title} subtitle = {"Release Date :" + movie.release_date} />
                    </GridListTile>
                ))}
            </GridList>
          </div>
          {/* FILTER FORM SECTION */}
          <div className = "filter-movies-section" style ={{width : 0.24*document.documentElement.scrollWidth}}>
                    <Card>
                        <CardContent>
                            {/* FORM TITLE */}
                            <Typography  style ={{...filterTitleStyle,...commonFilterStyle}}   >
                                FIND MOVIES BY:
                            </Typography> 
                            {/* MOVIE NAME FIELD */}
                            <FormControl required style ={commonFilterStyle}>
                                 <InputLabel htmlFor="movie-name">Movie Name:</InputLabel>
                                 <Input id="movie-name" onChange ={(e)=>setFilteredMovieName(e.target.value)} />
                            </FormControl>
                            {/* MOVIE GENRE FIELD */}
                            <FormControl required style ={commonFilterStyle}>
                                <InputLabel htmlFor="genre">Genres:</InputLabel>
                                <Select renderValue = {(selected) => selected.join(", ")} multiple value={filteredGenreArray} onChange={(e)=>setFilteredGenreArray(e.target.value)}>
                                    {genreObjectArray.map((genreObject) => (
                                    <MenuItem key={"genreID" + genreObject.id} value={genreObject.genre} >
                                        <Checkbox checked={filteredGenreArray.indexOf(genreObject.genre) > -1} />
                                        <ListItemText primary={genreObject.genre} />
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* MOVIE ARTISTS FIELD */}
                            <FormControl required style ={commonFilterStyle}>
                                <InputLabel htmlFor="artist">Artists:</InputLabel>
                                <Select renderValue = {(selected) => selected.join(", ")} multiple value={filteredArtistArray} onChange={(e)=>setFilteredArtistArray(e.target.value)}>
                                    {artistObjectArray.map((artistObject) => (
                                    <MenuItem key={"artistID" + artistObject.id} value={artistObject.first_name + " " + artistObject.last_name} >
                                         <Checkbox checked={filteredArtistArray.indexOf(artistObject.first_name + " " + artistObject.last_name) > -1} />
                                         <ListItemText primary={artistObject.first_name + " " + artistObject.last_name} />
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* MOVIE RELEASE START DATE FIELD */}
                            <FormControl required style ={commonFilterStyle}>
                               <TextField
                                  name="releaseStartDate"
                                  label="Release Date Start"
                                  InputLabelProps={{ shrink: true}}
                                  type="date"
                                  onChange={(e)=>setFilteredStartDate(e.target.value)}
                                  value={filteredStartDate}
                                  />
                            </FormControl>
                            {/* MOVIE RELEASE DATE END FIELD */}
                            <FormControl required style ={commonFilterStyle}>
                               <TextField
                                  name="releaseEndDate"
                                  label="Release Date End"
                                  InputLabelProps={{ shrink: true}}
                                  type="date"
                                  onChange={(e)=>setFilteredEndDate(e.target.value)}
                                  value={filteredEndDate}
                                  />
                            </FormControl>
                            {/* APPLY FILTERS BUTTON */}
                            <Button
                              color="primary"
                              variant="contained"
                              style = {{...commonFilterStyle,marginTop:30}}   
                              onClick = {filterFormHandler}
                              >
                              Apply
                              </Button>
                        </CardContent>
                    </Card>
          </div>
      </div>
    </Fragment>
  );
}
export default Home;
