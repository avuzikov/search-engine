import React, { useRef, useState } from "react";
import classes from "./SearchBox.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { historyActions } from "../../store/history";
import SearchResult from "./SearchResult";

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

  const [movie, setMovie] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    const quote = requestRef.current.value;
    if (quote === "") {
      return;
    }

    try {
      let responseObj;
      let url = new URL("127.0.0.1:8000");
      url.searchParams.append("query", quote);
      const searchRequest = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseObj = await searchRequest.json();
      console.log(responseObj);

      const obj = {
        quote: quote,
        response: responseObj,
        searchTime: new Date().getTime(),
      };

      const response = await fetch(
        `${requestsPath}${uid}.json?auth=${idToken}`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const idRequest = await response.json();

      const action = {
        id: idRequest.name,
        quote: quote,
        response: responseObj,
        searchTime: new Date().getTime(),
      };
      dispatch(historyActions.addElement(action));
      setMovie(action);
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
    //for now, everything except for the quote if predefined
    requestRef.current.value = "";
  }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.control}>
            <label htmlFor="newTask">New Request</label>
            <input type="text" id="newTask" ref={requestRef} />
          </div>

          <Button className={classes.button}>Find Movie</Button>
        </form>
      </Card>
      {movie && <SearchResult response={movie} />}
    </React.Fragment>
  );
};

export default SearchBox;
