import React, { useState } from 'react';
import { FormControl,FormHelperText } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import './Form.css'
 
function LoginForm(props){
  //States required: user,pass,their boolean error flags, and Error message to render upon error.
      const [username, setUsername] = useState('');
      const [usernameError,setUsernameError] = useState(false);
      const [password,setPassword] = useState('');
      const [passwordError,setPasswordError] = useState(false);
      const [errorMsg,setErrorMsg] = useState('');
      const {baseUrl} = props 

      //function uses fetch API for auth, and await chosen to handle promise, so function must be async.
      async function loginHandler(props){
            // Check for empty fields upon submit, to set boolean flags for error which will be used to conditionally render 'required' HelperText.
            // Also reset error flags if valid input for subsequent submissions.
            setErrorMsg('');
            if(username === '')
              setUsernameError(true);
            else
              setUsernameError(false);
            if(password === '')
              setPasswordError(true);
            else
              setPasswordError(false);

              // If no empty fields, call fetch API to POST details
              if(username !== '' && password !== ''){  
                const params = window.btoa(`${username}:${password}`);
                try{
                const rawResponse = await fetch(baseUrl + '/auth/login',{
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Cache-Control": "no-cache",
                      authorization: `Basic ${params}`
                      },
                  });
                const result = await rawResponse.json();
                if(rawResponse.ok){ // If response is successful, save access-token and redirect user to homepage.
                  window.sessionStorage.setItem('user-details',JSON.stringify(result));
                  window.sessionStorage.setItem('access-token',rawResponse.headers.get('access-token'));
                  window.location.href='/';
                }else{
                  const error = new Error();
                  error.message = result.message || 'Something went wrong while fetching response';
                  setErrorMsg(error.message);
                }
              }catch(e){
                alert(`Error : ${e.message}`);
              }
            }
         }
    return(
        <div className = 'form-container' > 
        <div className = 'form-item'>
             <FormControl required = {true} margin = 'normal' >
                <InputLabel htmlFor="login-username">Username</InputLabel>
                <Input id="login-username" onChange ={(e)=>setUsername(e.target.value)} />
                {(usernameError === false) ? null : <FormHelperText id="login-username" error = {true} >required</FormHelperText> }
            </FormControl> 
            </div>
            <div className = 'form-item'>
            <FormControl required = {true} margin = 'normal'  >
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <Input id="login-password" onChange ={(e)=>setPassword(e.target.value)}  />
                {(passwordError === false) ? null : <FormHelperText id="login-password" error = {true} >required</FormHelperText> }
            </FormControl> 
            </div>
            <div style ={{color:'red'}}>
              <br/>
                {errorMsg}
            </div> 
            
            <div className = 'form-item '>
            <Button
              color="primary"
              variant="contained"
              onClick={loginHandler}
            >
              Login
            </Button>
            </div>
        </div>
        )
}
export default LoginForm;