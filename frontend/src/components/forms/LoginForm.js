import classes from "./LoginForm.module.css";
import Button from "../UI/Button";
import validateEmail from "../functions/validationFunctions/validateEmail";
import validatePassword from "../functions/validationFunctions/validatePassword";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useState } from "react";
import { useSelector } from "react-redux";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = useSelector((state) => {
    return state.token.token;
  });
  const loginUrl = useSelector((state) => {
    return state.token.loginUrl;
  });

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);
    fetch(`${loginUrl}${token}`, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json(); //add user data to store
        } else {
          return res.json().then((data) => {
            let error = "";
            if (data && data.error && data.error.message) {
              if (data.error.message === "EMAIL_NOT_FOUND") {
                setErrorMessage("This email is not registered yet");
                error = "This email is not registered yet";
              } else if (data.error.message === "INVALID_PASSWORD") {
                setErrorMessage("The password is incorrect");
                error = "The password is incorrect";
              } else if (data.error.message !== "") {
                setErrorMessage("Something went wrong");
                error = "Something went wrong";
              }
            }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        let time = new Date().getTime();
        time += (data.expiresIn ? parseInt(data.expiresIn) : 0) * 1000;
        const action = {
          email: data.email ? data.email : "",
          expiresIn: data.expiresIn ? data.expiresIn : "",
          idToken: data.idToken ? data.idToken : "",
          kind: data.kind ? data.kind : "",
          localId: data.localId ? data.localId : "",
          refreshToken: data.refreshToken ? data.refreshToken : "",
          displayName: data.displayName ? data.displayName : "",
          registered: data.registered ? true : false,
          expirationTime: time.toString(),
        };
        dispatch(authActions.login(action));
        navigate("/");
      })
      .catch((err) => {});

    resetEmail();
    resetPassword();
  };

  const emailInputClasses = emailHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;
  const passwordInputClasses = passwordHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : `${classes["form-control"]}`;

  return (
    <form onSubmit={formSubmissionHandler}>
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
          <p className={classes["error-text"]}>
            Please insert valid email address
          </p>
        )}
      </div>
      <div className={passwordInputClasses}>
        <label htmlFor="password">Your password</label>
        <input
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className={classes["error-text"]}>
            Please insert valid password (at least 8 characters)
          </p>
        )}
      </div>
      <div className={classes["form-actions"]}>
        <Button>Submit</Button>
      </div>
      {isLoading && <p>Is loading...</p>}
      {errorMessage !== "" && (
        <p className={classes["error-text"]}>{errorMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
