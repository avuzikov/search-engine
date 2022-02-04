import React, { useEffect, useCallback } from "react";
import classes from "./HistoryList.module.css";
import Card from "../UI/Card";
import SearchItem from "./SearchItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { historyActions } from "../../store/history";

const HistoryList = () => {
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

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${requestsPath}${uid}.json?auth=${idToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseObj = await response.json();
      const requests = [];
      for (let key in responseObj) {
        requests.push({
          id: key,
          value: responseObj[key].value,
        });
      }
      dispatch(historyActions.initialize(requests));
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  }, [dispatch, idToken, requestsPath, uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const requests = useSelector((state) => {
    return state.history.requests;
  });

  if (requests.length === 0) {
    return (
      <Card className={classes.card}>
        <h2 className="tasks__fallback">Found requests</h2>
      </Card>
    );
  }
  return (
    <Card className={classes.card}>
      <ul className={classes.list}>
        {requests.map((request) => (
          <SearchItem key={request.id} id={request.id} task={request.value} />
        ))}
      </ul>
    </Card>
  );
};

export default HistoryList;
