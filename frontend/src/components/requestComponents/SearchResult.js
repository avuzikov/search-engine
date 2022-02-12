import React from "react";
import Card from "../UI/Card";
import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  console.log(props.response);
  return (
    <Card className={classes.card}>
      <figure className={classes.movie}>
        <div className={classes.movie__hero}>
          <img
            src={props.response.response.poster}
            alt="Poster"
            className={classes.movie__img}
          />
        </div>
        <div className={classes.movie__content}>
          <div className={classes.movie__title}>
            <h1 className={classes.heading__primary}>
              <a className={classes.link} href={props.response.response.url}>
                {props.response.response.name}
              </a>
              <i className={`${classes.fas} ${classes["fa-fire"]}`}></i>
            </h1>
            <div
              className={`${classes.movie__tag} ${classes["movie__tag--2"]}`}
            >
              Rating: {props.response.response.rating}
            </div>
          </div>
          <p className={classes.movie__description}>
            "{props.response.response.quote}", {props.response.response.minute}m
            {props.response.response.second}s
          </p>
        </div>
      </figure>
    </Card>
  );
};

export default SearchResult;
