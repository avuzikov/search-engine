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
              {props.response.response.name}
              <i className={`${classes.fas} ${classes["fa-fire"]}`}></i>
            </h1>
            <div
              className={`${classes.movie__tag} ${classes["movie__tag--1"]}`}
            >
              #action
            </div>
            <div
              className={`${classes.movie__tag} ${classes["movie__tag--2"]}`}
            >
              #thriller
            </div>
          </div>
          <p className={classes.movie__description}>
            First Blood is a 1982 American action film directed by Ted Kotcheff,
            and co-written by Sylvester Stallone, who also stars as Vietnam War
            veteran John Rambo.
          </p>
          <div className={classes.movie__details}>
            <p className={classes.movie__detail}>
              <span className={`${classes.icons} ${classes["icons-red"]}`}>
                <i
                  className={`${classes.fas} ${classes["fa-camera-retro"]}`}
                ></i>{" "}
              </span>
              Buzz Feitshans
            </p>
            <p className={classes.movie__detail}>
              <span className={`${classes.icons} ${classes["cons-grey"]}`}>
                <i className={`${classes.fas} ${classes["fa-clock"]}`}></i>{" "}
              </span>
              1h 33m
            </p>
            <p className={classes["movie__detail"]}>
              <span className={`${classes.icons} ${classes["icons-yellow"]}`}>
                <i
                  className={`${classes.fas} ${classes["fa-file-invoice-dollar"]}`}
                ></i>
              </span>
              $12.52 crores
            </p>
          </div>
        </div>
      </figure>
    </Card>
  );
};

export default SearchResult;
