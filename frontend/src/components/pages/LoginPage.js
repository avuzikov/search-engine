import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import Button from "../UI/Button";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.form}>
      <LoginForm />
      <Button
        onClick={() => {
          navigate("/new");
        }}
      >
        Want to create a new account?
      </Button>
    </div>
  );
};

export default LoginPage;
