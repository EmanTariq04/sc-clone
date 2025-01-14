import React, { useEffect } from "react";
import "./App.css";
import WebCamCapture from "./WebCamCapture";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/appSlice";
import Login from "./Login";
import { getAuth } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("Auth User:", authUser);
      if (authUser) {
        dispatch(
          login({
            usrename: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [auth, dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app-logo"
              src="https://www.usatoday.com/gcdn/presto/2019/08/16/USAT/bd6538e4-5535-41ce-857b-518451c3a958-Snapchat_Logo_H.png?crop=1125,1500,x674,y0"
              alt=""
            />
            <div className="app-body">
              <div className="app-bodybackground">
                <Routes>
                  <Route path="/" element={<WebCamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/chats/view" element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
