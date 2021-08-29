import Button from "@material-ui/core/Button";
import React from "react";
export default  function BookShowButton(){
    return <Button variant="contained" color="primary" onClick={()=>{window.location.href = '/bookshow/:id'}}>Book Show</Button>
}