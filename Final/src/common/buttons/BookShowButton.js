import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { Fragment } from "react";
import Modal from "react-modal";
import LoginRegisterModal from '../modals/LoginRegisterModal';

export default  function BookShowButton(props){
    const {accessToken} = props
    const {baseUrl} = props
    const {movieID} = props
    const [modalIsOpen,setModalisOpen] = useState(false);
    const modalStyle = {          // style needed for centering modal pop-up for register/login
        content : {
            top         : '50%',
            right       : 'auto',
            bottom      : 'auto',
            left        : '50%',
            transform   : 'translate(-50%, -50%)',
          }
          };
    function ClickHandler(){
        if(accessToken === undefined){
                setModalisOpen(true)
        }else{
            window.location.href = '/bookshow/' + movieID;
        }
    }
    return <Fragment>
        <Button variant="contained" color="primary" onClick={ClickHandler}>Book Show</Button>

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalisOpen(false) } style = {modalStyle}  > 
            <LoginRegisterModal baseUrl ={baseUrl} />   
        </Modal>
        </Fragment>
}