import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";

import getAccountsHandler from "../../../../../lib/accountsServer";
import hashPassword from "../../../../../lib/utils/hashPassword";


const useStyles = makeStyles((theme) => ({
  root: {
    "display": "flex",
    "flexDirection": "column",
    "& > *": {
      margin: theme.spacing(1),
       color:"white"
      
    }
  },
  forgotPassword: {
    textDecoration: "underline",
    fontStyle: "italic",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color:"white"
  },
  switchEntryMode: {
    textAlign: "center",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  signInButton: {
    marginTop: theme.spacing(4),
    color:"#000",
    backgroundColor:"white"
  },
  error: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "white",
    fontSize: "1.1em",
    textAlign: "center"
  }
}));

/**
 * Component to render to allow user to login
 * @param {Object} props of structure { closeModal: func, openModal: func }
 * @returns {Object} jsx
 */
export default function Login(props) {
  const { closeModal, openModal, refetch } = props;
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { passwordClient } = getAccountsHandler();

  const handleForgotPasswordClick = () => {
    openModal("forgot-password");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOpenSignUp = () => {
    openModal("signup");
  };

  const registerUser = async () => {
    try {
      await passwordClient.login({
        user: {
          email
        },
        password: hashPassword(password)
      });
      await refetch();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form className={classes.root} noValidate>
      <h1>Sign in to your account</h1>
      <FormControl>
        <InputLabel htmlFor="email" style={{color:"white"}}>Email</InputLabel>
        <Input id="email" aria-describedby="email-address" onChange={handleEmailChange} value={email}
          type="email"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password" style={{color:"white"}}>Password</InputLabel>
        <Input id="password" style = {{color:'white' }} aria-describedby="password" onChange={handlePasswordChange} value={password}
          type="password"
        />
      </FormControl>
      <div className={classes.forgotPassword} onClick={handleForgotPasswordClick} onKeyDown={handleForgotPasswordClick} role="button"
        tabIndex={0}
      >Forgot Password?</div>
      <Button onClick={registerUser} color="white"  variant="contained" className={classes.signInButton}>Sign In</Button>
      {!!error && <div className={classes.error}>{error}</div>}
      <div className={classes.switchEntryMode} onClick={handleOpenSignUp} onKeyDown={handleOpenSignUp} role="button"
        tabIndex={0}
      >Don't have an account? Sign Up</div>
    </form>
  );
}

Login.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  refetch: PropTypes.func
};
