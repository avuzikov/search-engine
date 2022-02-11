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
    //send request to Nicos backend, get required parameters
    let responseObj;
    /*try {
      const searchRequest = await fetch(path, {
        method: "POST",
        body: JSON.stringify({ quote: quote }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseObj = await searchRequest.json();
    } catch (err) {
      console.log(err);
    }*/
    //for now, everything except for the quote if predefined
    responseObj = {
      quote: quote,
      name: "name",
      url: "url",
      rating: "rating",
      minute: "minute",
      second: "second",
      poster:
        "https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all",
    };

    const obj = {
      quote: quote,
      response: responseObj,
      searchTime: new Date().getTime(),
    };
    try {
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
