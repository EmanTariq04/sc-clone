import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { db } from "./firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { getAuth } from "firebase/auth";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const auth = getAuth();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate('/');
    
  }

  return (
    <div className="chats">
      <div className="chats-header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats-avatar"
        />
        <div className="chats-search">
          <SearchIcon className="chats-searchicon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats-chaticon" />
      </div>
      <div className="chats-posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
              timestamp={timestamp}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className="chats-takepicicon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
