import React from "react";
import AddTodo from "../simpleTodos/AddTodo";
import TodoList from "../simpleTodos/TodoList";

const ToDoListPage = () => {
  return (
    <React.Fragment>
      <AddTodo />
      <TodoList />
    </React.Fragment>
  );
};

export default ToDoListPage;
