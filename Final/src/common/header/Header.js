import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import BookShowButton from "../buttons/BookShowButton";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
function Header(props) {
      const {baseUrl} = props;
      const {movieID} = props;
      const accessToken = window.sessionStorage['access-token'];  //used to judge logged-in/logged-out state
      let buttonContainerContent;
      if(accessToken===undefined && movieID === undefined){   // If no access-token, user must be logged-out, so render Login button        
          buttonContainerContent = (<span className="buttons-container">
                                      <span className="button"><LoginButton baseUrl={baseUrl} /></span>
                                    </span> );}
      else if(accessToken === undefined && movieID !== undefined){                          
          buttonContainerContent = (<span className="buttons-container">
                                      <span className="button"><LoginButton baseUrl ={baseUrl}/></span>
                                      <span className="button"><BookShowButton baseUrl ={baseUrl} accessToken ={accessToken} movieID ={movieID} /></span>
                                   </span> );}
          else if(accessToken!== undefined && movieID === undefined){
            buttonContainerContent = (<span className="buttons-container">
                                      <span className="button"><LogoutButton baseUrl={baseUrl} /></span>
                                    </span> );}
              else{
                   buttonContainerContent = (<span className="buttons-container">
                                      <span className="button"><LogoutButton baseUrl ={baseUrl}/></span>
                                      <span className="button"><BookShowButton baseUrl ={baseUrl} accessToken ={accessToken} movieID ={movieID}/></span>
                                   </span> );}

  return (
    <div className="header-container">
      <img src={logo} className="logo" alt="" />
          {buttonContainerContent} 
    </div>
  );
}
export default Header;
