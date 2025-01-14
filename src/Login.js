import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://www.usatoday.com/gcdn/presto/2019/08/16/USAT/bd6538e4-5535-41ce-857b-518451c3a958-Snapchat_Logo_H.png?crop=1125,1500,x674,y0"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Login;
