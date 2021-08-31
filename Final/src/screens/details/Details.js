import React from "react";
import { Fragment } from "react";
import Header from "../../common/header/Header";
// Details page with functionality only expected until Homepage rubric.
function Details(props){
    const {baseUrl} = props;
    return <Fragment>
        <Header baseUrl ={baseUrl} />
        {`Details Page opened by clicking movie with id : ${props.match.params.id}.`}
        <br/>        
        The page will be implemented in next commit
        <br/>
        <button onClick ={()=>props.history.push('/')}>Go to Homepage</button>
        </Fragment>
}
export default Details;