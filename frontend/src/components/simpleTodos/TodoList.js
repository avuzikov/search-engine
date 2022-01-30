import React, { useEffect, useCallback } from "react";
import classes from "./TodoList.module.css";
import Card from "../UI/Card";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo";

const TodoList = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => {
    return state.auth.localId;
  });
  const idToken = useSelector((state) => {
    return state.auth.idToken;
  });
  const todosPath = useSelector((state) => {
    return state.token.todosPath;
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${todosPath}${uid}.json?auth=${idToken}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseObj = await response.json();
      const tasks = [];
      for (let key in responseObj) {
        tasks.push({
          id: key,
          value: responseObj[key].value,
          type: responseObj[key].type,
        });
      }
      dispatch(todoActions.initialize(tasks));
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  }, [dispatch, idToken, todosPath, uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tasks = useSelector((state) => {
    return state.todo.tasks;
  });

  if (tasks.length === 0) {
    return (
      <Card className={classes.card}>
        <h2 className="tasks__fallback">Found no tasks</h2>
      </Card>
    );
  }
  return (
    <Card className={classes.card}>
      <ul className={classes.list}>
        {tasks.map((task) => (
          <TodoItem key={task.id} id={task.id} task={task.value} type={task.type} />
        ))}
      </ul>
    </Card>
  );
};

export default TodoList;
