import React, { Suspense, useEffect } from "react";

import { authActions } from "./store/auth";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const LoginPage = React.lazy(() => import("./components/pages/LoginPage"));
const ChangePasswordPage = React.lazy(() =>
  import("./components/pages/ChangePasswordPage")
);
const ToDoListPage = React.lazy(() =>
  import("./components/pages/ToDoListPage")
);
const CreateProfilePage = React.lazy(() =>
  import("./components/pages/CreateProfilePage")
);
/* */

function App() {
  useEffect(() => {
    console.log("Will be glad to see you for an interview!");
    console.log(
      "My github with code of the project: https://github.com/avuzikov/todo"
    );
  }, []);

  const dispatch = useDispatch();

  const action = JSON.parse(localStorage.getItem("tokenInfo"));

  const time = new Date().getTime();

  if (action && parseInt(action.expirationTime) <= time) {
    dispatch(authActions.logout(action));
  } else if (action) {
    dispatch(authActions.login(action));
  }

  const loggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        {!loggedIn && (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new" element={<CreateProfilePage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        {loggedIn && (
          <Layout>
            <Routes>
              <Route path="/" element={<ToDoListPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        )}
      </Suspense>
    </React.Fragment>
  );
}

export default App;
