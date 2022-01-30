import { useState } from "react";
import { useSelector } from "react-redux";

const useAuth = (performedAction) => {
  const token = useSelector((state) => {
    return state.token;
  });

  //const response =

  const [isLoading, setIsLoading] = useState(false);
  let url = "";
  if (performedAction === "login") {
    url = `${token.loginUrl}${token.token}`;
  }
  if (performedAction === "signup") {
    url = `${token.signUpUrl}${token.token}`;
  }

  const sendRequest = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword1,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!res.ok) {
        // setStatesForError
      }
      const data = await response.json();
      // applyData(data);
    } catch {}
    return data;
  };
  return { isLoading: isLoading, sendRequest: sendRequest };
};

export default useAuth;
