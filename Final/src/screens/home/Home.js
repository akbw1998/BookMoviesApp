import React from "react";
import Header from "../../common/header/Header";
function Home(props){
    const {baseUrl} = props;
    return <Header baseUrl={baseUrl}/>
}
export default Home;