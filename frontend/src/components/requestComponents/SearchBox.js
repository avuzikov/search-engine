import { useRef } from "react";
import classes from "./SearchBox.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { historyActions } from "../../store/history";

const SearchBox = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => {
    return state.auth.localId;
  });
  const idToken = useSelector((state) => {
    return state.auth.idToken;
  });
  const requestsPath = useSelector((state) => {
    return state.token.requestsPath;
  });
  const requestRef = useRef("");

  async function submitHandler(event) {
    event.preventDefault();
    const quote = requestRef.current.value;
    if (quote === "") {
      return;
    }
    try {
      const response = await fetch(
        `${requestsPath}${uid}.json?auth=${idToken}`,
        {
          method: "POST",
          body: JSON.stringify({ quote: quote }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const idRequest = await response.json();

      const action = { id: idRequest.name, quote: quote };
      dispatch(historyActions.addElement(action));
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
    requestRef.current.value = "";
  }

  return (
    <Card className={classes.card}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="newTask">New Request</label>
          <input type="text" id="newTask" ref={requestRef} />
        </div>

        <Button className={classes.button}>Find Movie</Button>
      </form>
    </Card>
  );
};

export default SearchBox;
