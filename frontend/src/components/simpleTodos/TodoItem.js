import Card from "../UI/Card";
import classes from "./TodoItem.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { todoActions } from "../../store/todo";

const TodoItem = (props) => {
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

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${todosPath}${uid}/${props.id}.json?auth=${idToken}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const idTask = await response.json();
      console.log(idTask);
      dispatch(todoActions.removeElement(props.id));
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  };
  return (
    <li>
      <Card className={`${classes.card} ${classes[props.type]}`}>
        <h2>{props.task}</h2>
        <Button onClick={deleteHandler}>Delete</Button>
      </Card>
    </li>
  );
};

export default TodoItem;
