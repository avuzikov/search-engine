import classes from "./MainNavigation.module.css";
import { NavLink, Link } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";

const MainNavigation = () => {
  const dispatch = useDispatch();

  return (
    <header className={classes.header}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={classes.logo}>SEARCH MOVIE APP</div>
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/change-password"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Change Password
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={(navData) => (navData.isActive ? classes.active : "")}
              onClick={() => {
                dispatch(authActions.logout());
              }}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
