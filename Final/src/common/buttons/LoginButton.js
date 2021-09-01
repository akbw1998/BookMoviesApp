import Button from "@material-ui/core/Button";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import Modal from "react-modal";
import LoginRegisterModal from '../modals/LoginRegisterModal';

Modal.setAppElement('#root');
export default function LoginButton(props) {
  const {baseUrl} = props
  const [modalIsOpen, setModalisOpen] = useState(false);
  const modalStyle = {          // style needed for centering modal pop-up for register/login onClick of Login
    content : {
        top         : '50%',
        right       : 'auto',
        bottom      : 'auto',
        left        : '50%',
        transform   : 'translate(-50%, -50%)',
      }
      };
  return (
    <Fragment>
      <Button                       // Login button 
        variant="contained"
        color="default"
        onClick={() => setModalisOpen(true)}
      >
        Login
      </Button>
      {/* Open modal pop-up component for login-register onClick of Login */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalisOpen(false) } style = {modalStyle}  > 
        <LoginRegisterModal baseUrl ={baseUrl} />   
      </Modal>
    </Fragment>
  );
}
