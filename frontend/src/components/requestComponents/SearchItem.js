import Card from "../UI/Card";
import classes from "./SearchItem.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { historyActions } from "../../store/history";

const SearchItem = (props) => {
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

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${requestsPath}${uid}/${props.id}.json?auth=${idToken}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const idTask = await response.json();
      console.log(idTask);
      dispatch(historyActions.removeElement(props.id));
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  };
  return (
    <li>
      <Card className={`${classes.card} other`}>
        <h2>{props.quote}</h2>
        <Button onClick={deleteHandler}>Delete</Button>
      </Card>
    </li>
  );
};

export default SearchItem;
