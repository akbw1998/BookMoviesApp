import React from 'react';
import {Tabs, Tab } from '@material-ui/core';
import { useState } from 'react';
import { Fragment } from 'react';
import LoginForm from '../forms/LoginForm'
import RegisterForm from '../forms/RegisterForm';
function LoginRegisterModal(props){
    const {baseUrl} = props;
    const [selectedTab,setSelectedTab] = useState(0);
    const handleChange =(event,newValue)=>{
        setSelectedTab(newValue);
    };
    return(
        <Fragment>
            <Tabs value = {selectedTab} onChange={handleChange}>
                 <Tab label = "Login"  /> 
                 <Tab label = "Register" />
            </Tabs>
            {/* Render LoginForm component onClick of Login Tab */}
            <TabPanel value={selectedTab} index={0}>
                <LoginForm baseUrl = {baseUrl}/>
            </TabPanel>
            {/* Render RegisterForm component onClick of Register Tab */}
            <TabPanel value={selectedTab} index={1}>
                <RegisterForm baseUrl ={baseUrl} />
            </TabPanel>
        </Fragment>
        )
        // Logic coordinating selection of Tab with respective form
        function TabPanel(props){
            const {children,value,index} = props;
            return (value === index) && <div>{children}</div>;
        }
}
export default LoginRegisterModal;