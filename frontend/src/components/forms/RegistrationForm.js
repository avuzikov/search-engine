import { useState } from "react";
import { useNavigate } from "react-router";
import validateEmail from "../functions/validationFunctions/validateEmail";
import validateName from "../functions/validationFunctions/validateName";
import validatePassword from "../functions/validationFunctions/validatePassword";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import classes from "./RegistrationForm.module.css";
import { useSelector } from "react-redux";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => {
    return state.token.token;
  });
  const registrationUrl = useSelector((state) => {
    return state.token.signUpUrl;
  });

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(validateName);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const {
    value: enteredPassword1,
    isValid: password1IsValid,
    hasError: password1HasError,
    valueChangeHandler: password1ChangeHandler,
    inputBlurHandler: password1BlurHandler,
    reset: resetPassword1,
  } = useInput(validatePassword);

  const {
    value: enteredPassword2,
    isValid: password2IsValid,
    hasError: password2HasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (
    password1IsValid &&
    password2IsValid &&
    enteredPassword1 === enteredPassword2 &&
    nameIsValid &&
    emailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    //console.log(enteredName); //will send it later to save
    //console.log(enteredEmail);
    //console.log(enteredPassword1);
    
    setIsLoading(true);
    fetch(`${registrationUrl}${token}`, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword1,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        setRegistered(true);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        return res.json().then((data) => {
          if (data && data.error && data.error.message) {
            if (data.error.message === "EMAIL_EXISTS") {
              setErrorMessage("Email already exists!");
            } else {
              setErrorMessage(data.error.message);
            }
          }
        });
      }
    });

    resetName();
    resetEmail();
    resetPassword1();
    resetPassword2();
  };

  if (errorMessage !== "") {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }

  const nameInputClasses = nameHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;
  const emailInputClasses = emailHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;
  const password1InputClasses = password1HasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;
  const password2InputClasses = password2HasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Personal or company name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className={classes["error-text"]}>
            Please enter a valid name(not empty)
          </p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className={classes["error-text"]}>Please enter a valid email</p>
        )}
      </div>
      <div className={password1InputClasses}>
        <label htmlFor="password1">New password</label>
        <input
          type="password"
          id="password1"
          value={enteredPassword1}
          onChange={password1ChangeHandler}
          onBlur={password1BlurHandler}
        />
        {password1HasError && (
          <p className={classes["error-text"]}>
            Please insert valid password (at least 8 characters)
          </p>
        )}
      </div>
      <div className={password2InputClasses}>
        <label htmlFor="password2">Repeat password</label>
        <input
          type="password"
          id="password2"
          value={enteredPassword2}
          onChange={password2ChangeHandler}
          onBlur={password2BlurHandler}
        />
        {password2HasError && (
          <p className={classes["error-text"]}>
            Password must be correct(at least 8 characters) and equal to the
            first password
          </p>
        )}
      </div>
      <div className={classes["form-actions"]}>
        <Button>Submit</Button>
      </div>
      {errorMessage !== "" && (
        <p className={classes["error-text"]}>{errorMessage}</p>
      )}
      {isLoading && <p>is Loading...</p>}
      {registered && <p>Successfully registered!</p>}
    </form>
  );
};

export default RegistrationForm;
