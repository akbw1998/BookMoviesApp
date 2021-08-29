import React, {useState } from 'react';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { FormHelperText } from '@material-ui/core';
import './Form.css'
// For each input field, there is an errorMsg and a boolean error flag used to conditionally render errorMsg.
// Since there are 5 feilds, this results in 15 total states. There is also 1 additional state to render successful Registration.
// So total states = 16.
function RegisterForm(props){
    const {baseUrl} = props;
    const [firstName,setFirstName] = useState('');
    const [firstNameError,setFirstNameError] = useState(false);
    const [firstNameErrorMessage,setFirstNameErrorMessage] = useState('');
    const [lastName,setLastName] = useState('');
    const [lastNameError,setLastNameError] = useState(false);
    const [lastNameErrorMessage,setLastNameErrorMessage] = useState('');
    const [email,setEmail] = useState('');
    const [emailError,setEmailError] = useState(false);
    const [emailErrorMessage,setEmailErrorMessage] = useState('');
    const [password,setPassword] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const [passwordErrorMessage,setPasswordErrorMessage] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [contactNoError,setContactNoError] = useState(false);
    const [contactNoErrorMessage,setContactNoErrorMessage] = useState('');
    const [successMsg,setSuccessMsg] = useState('');
    
    //Function to validate fields and render error text if required. Also posts details if valid entries filled, with a confirmation success message.
    async function registerHandler(){
        let validFirstNameFlag = false;
        let validLastNameFlag = false;
        let validEmailFlag = false;
        let validPasswordFlag = false;
        let validContactNoFlag = false;
        if(firstName === '' || (/\d/.test(firstName))){
            setFirstNameError(true);
            if(firstName ==='')
                setFirstNameErrorMessage('required');
            else
                setFirstNameErrorMessage('This field cannot contain numerals .');
        }else{
            setFirstNameErrorMessage('');
            setFirstNameError(false);
            validFirstNameFlag = true;
        }
        if(lastName === '' || (/\d/.test(lastName))){
            setLastNameError(true);
            if(lastName === '')
                setLastNameErrorMessage('required');
            else
                setLastNameErrorMessage('This field cannot contain numerals.');
        }else{
            setLastNameErrorMessage('');
            setLastNameError(false);
            validLastNameFlag = true;
        }
        if( /\S+@\S+\.\S+/.test(email) === false) {
            if(email === '')
                setEmailErrorMessage('required');
            else
                setEmailErrorMessage('Expected Format Ex : xyz@gmail.com');
        }else{
            setEmailErrorMessage('');
            setEmailError(false);
            validEmailFlag = true;
        }
        if(password.length < 8 || (/[a-z]/.test(password) === false) || (/[A-Z]/.test(password) === false) || (/\d/.test(password))===false){
            setPasswordError(true);
            if(password ==='')
                setPasswordErrorMessage('required');
            else
                setPasswordErrorMessage('Requires atleast 1 uppercase,1 lowercase,1 number and length of 8');
        }else{
            setPasswordErrorMessage('');
            setPasswordError(false);
            validPasswordFlag = true;
        }
        if((/^[0-9]+$/).test(contactNo) === false || contactNo.length !== 10){
            setContactNoError(true);
            if(contactNo ==='')
                setContactNoErrorMessage('required');
            else
                setContactNoErrorMessage('Must be a 10 digit number.');
        }else{
            setContactNoErrorMessage('');
            setContactNoError(false);
            validContactNoFlag = true;
        }
        if (validFirstNameFlag && validLastNameFlag && validEmailFlag && validPasswordFlag && validContactNoFlag){
            let params = {
                email_address : email,
                first_name: firstName,
                 last_name: lastName,
                mobile_number: contactNo,
                password: password
                }
            try{
                const rawResponse =  await fetch(baseUrl + "/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Cache-Control": "no-cache",
                            },
                        body: JSON.stringify(params),
                        });
                const result = await rawResponse.json()                           
                if(rawResponse.ok){
                    setSuccessMsg('Registration Successful. Please Login!');
                }else{
                 const error = new Error();
                 error.message = result.message || ' There was an error while registering.';
                 setSuccessMsg(error.message);
                 alert(`Error : ${error.message}`);
                }
            }catch(e){
                alert(`Error : ${e.message}`);
            }
        }else
            setSuccessMsg('');
    }
    return(
        <div className = 'form-container' > 
            <div className = 'form-item'>
                <FormControl required = {true} margin = 'normal' >
                    <InputLabel htmlFor="register-firstname">First Name</InputLabel>
                    <Input id="register-firstname" onChange={(e)=>setFirstName(e.target.value)}  />
                    {(firstNameError === false) ? null : <FormHelperText id="register-firstname" error={true}>{firstNameErrorMessage}</FormHelperText> }
                </FormControl> 
            </div>
            <div className = 'form-item'>
                <FormControl required = {true} margin = 'normal'  >
                    <InputLabel htmlFor="register-lastname">Last Name</InputLabel>
                    <Input id="register-lastname" onChange ={(e)=>setLastName(e.target.value)} />
                    {(lastNameError === false) ? null : <FormHelperText id="register-lastname" error = {true}>{lastNameErrorMessage}</FormHelperText> }   
                </FormControl> 
            </div>
            
            <div className = 'form-item'>
                <FormControl required = {true} margin = 'normal'  >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" onChange ={(e)=>setEmail(e.target.value)}  />
                    {(emailError === false) && <FormHelperText id="email" error = {true}>{emailErrorMessage}</FormHelperText> }
                </FormControl> 
            </div>
            <div className = 'form-item'>
                <FormControl required = {true} margin = 'normal'  >
                    <InputLabel htmlFor="register-password">Password</InputLabel>
                    <Input id="register-password" onChange ={(e)=>setPassword(e.target.value)}  />
                    {(passwordError === false) ? null : <FormHelperText id="register-password" error = {true}>{passwordErrorMessage}</FormHelperText> }
                </FormControl> 
            </div>
            <div className = 'form-item'>
                <FormControl required = {true} margin = 'normal'  >
                    <InputLabel htmlFor="contact-no">Contact No.</InputLabel>
                    <Input id="contact-no" onChange ={(e)=>setContactNo(e.target.value)}   />
                    {(contactNoError === false) ? null : <FormHelperText  id="contact-no" error = {true}>{contactNoErrorMessage}</FormHelperText> }
                </FormControl> 
            </div>
            <div className = 'form-item form-success-msg'>
                <br/>
                {successMsg}
                <br/><br/>
            </div> 
            <div className = 'form-item '>
                <Button
                variant="contained"
                color="primary"
                onClick = {registerHandler}
                >
                Register
                </Button>
            </div>
        </div>
        )
}
export default RegisterForm;