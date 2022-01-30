import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../forms/RegistrationForm";
import Button from "../UI/Button";
import classes from "./CreateProfilePage.module.css";

const CreateProfilePage = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.form}>
      <RegistrationForm />
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Already have an account?
      </Button>
    </div>
  );
};

export default CreateProfilePage;
