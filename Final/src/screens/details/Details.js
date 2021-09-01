import React from "react";
import { Fragment } from "react";
import Header from "../../common/header/Header";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { GridList,GridListTile,GridListTileBar } from "@material-ui/core";
import "./Details.css";
function Details(props) {
  const { baseUrl } = props;
  const movieID = props.match.params.id;
  const [movieGenreArray, setMovieGenreArray] = useState([]);
  const [movieTrailer,setMovieTrailer] = useState('');
  const [clickedMovieObject,setClickedMovieObject] = useState({});
  const [movieArtistArray,setMovieArtistArray] = useState([]);
  const moviePlayOptions = {
    height: '400',
    width: '100%',
    playerVars: {
        autoplay: 1
    }
    }
    const [starIcons, setStarIcons] = useState([{
                                                    id: 1,
                                                    stateId: "star1",
                                                    color: "black"
                                                },
                                                    {
                                                        id: 2,
                                                        stateId: "star2",
                                                        color: "black"
                                                    },
                                                    {
                                                        id: 3,
                                                        stateId: "star3",
                                                        color: "black"
                                                    },
                                                    {
                                                        id: 4,
                                                        stateId: "star4",
                                                        color: "black"
                                                    },
                                                    {
                                                        id: 5,
                                                        stateId: "star5",
                                                        color: "black"
                                                    }]);
    
    function onStarClick(id){
        let starIconsCopy = [...starIcons];
        for (let star of starIconsCopy) {
            if (star.id <= id) {
                star.color = 'yellow'
            }
            else {
                star.color = "black";
            }
        }
        // console.log(`Star icons copy : ${starIconsCopy}`)
         setStarIcons(starIconsCopy);
    }      
  useEffect(() => {
    fetch(baseUrl + "movies/" + movieID)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const movieObject = data;
        setClickedMovieObject(movieObject);
        setMovieGenreArray(movieObject.genres);
        setMovieTrailer(movieObject.trailer_url);
        setMovieArtistArray(movieObject.artists);
      });
  }, []);

  function _onReady(event) { event.target.pauseVideo();}
  function artistClickHandler(url){  window.location = url;}
    
  return (
    <Fragment>
       {/* Header and Back Button */}
      <Header baseUrl={baseUrl} movieID={movieID}  />
      <div className="back-button">
        <Typography variant="button">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {"< Back to Home"}
          </Link>
        </Typography>
      </div>
        {/* Left Section */}
      <div className="flex-container-details">
        <div className="left-details" style={{ width: 0.2 * document.documentElement.scrollWidth}}>
          <img src={clickedMovieObject.poster_url} alt={clickedMovieObject.title} style ={{width: '100%'}} />
        </div>
        {/* Middle Section */}
        <div className="middle-details" style={{ width: 0.6 * document.documentElement.scrollWidth }}>
          <div>
            <Typography variant="headline" component="h2">{clickedMovieObject.title}</Typography>
          </div>
          <br />
          <div>
            <Typography><span className="bold">Genres: </span> {movieGenreArray.join(', ') }</Typography>
          </div>
          <div>
            <Typography><span className="bold">Duration:</span> {clickedMovieObject.duration}</Typography>
          </div>
          <div>
            <Typography>
              <span className="bold">Release Date:</span>{new Date(clickedMovieObject.release_date).toDateString()}</Typography>
          </div>
          <div>
            <Typography><span className="bold"> Rating:</span> {clickedMovieObject.rating}</Typography>
          </div>
          <div style = {{marginTop : 16}}>
            <Typography>
              <span className="bold">Plot:</span>
              <a href={clickedMovieObject.wiki_url } target = '_blank'>(Wiki Link)</a> {clickedMovieObject.storyline}
            </Typography>
          </div>
          <div className="trailer-container">
            <Typography><span className="bold">Trailer:</span></Typography>
            <YouTube
              videoId={movieTrailer.split("?v=")[1]}
              opts={moviePlayOptions}
              onReady={_onReady}
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="right-details" style={{ width: 0.2 * document.documentElement.scrollWidth }}>
            <Typography><span className="bold">Rate this movie: </span></Typography>
            {starIcons.map(star => (
                <StarBorderIcon
                    style ={{color : star.color}}
                    key={"star" + star.id}
                    onClick={() => onStarClick(star.id)}
                />
            ))}
            <div className="bold" style={{marginBottom :16, marginTop:16}}>
                <Typography>
                    <span className="bold">Artists:</span>
                </Typography>
            </div>
            
                <GridList cellHeight={160} cols={2}>
                    {movieArtistArray != null && movieArtistArray.map(artist => (
                        <GridListTile
                            className="gridTile"
                            onClick={() => artistClickHandler(artist.wiki_url)}
                            key={artist.id}>
                            <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                            <GridListTileBar
                                title={artist.first_name + " " + artist.last_name}
                            />
                        </GridListTile>
                    ))}
                </GridList>
        </div>
      </div>
    </Fragment>
  );
}
export default Details;
