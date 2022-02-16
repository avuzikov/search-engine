import React from "react";
import Card from "../UI/Card";
import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  console.log(props.response);
  return (
    <Card className={classes.card}>
      <div className={classes["quote--container"]}>
        <p className={classes["quote"]}>
          <span className={classes["quote--highlight"]}>
            {props.response.response.quote}
          </span>
        </p>
        <p className={classes["quote--author"]}>
          In{" "}
          <span className={classes["movie--name"]}>
            {props.response.response.name}
          </span>{" "}
          at {props.response.response.minute}:{props.response.response.second}
        </p>
      </div>
    </Card>
  );
};

export default SearchResult;
