import Button from "@material-ui/core/Button";
import React from "react";
export default  function LogoutButton(){
    //Must clear session storage to wipe off access-token, and redirect to Homepage to re-render buttons based on access-token.
    function logoutHandler(){
        window.sessionStorage.clear();
        window.location.href = '/'
    }
    return <Button variant="contained" color="default" onClick = {logoutHandler}>Logout</Button>
}