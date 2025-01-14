import React from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import ReactTimeago from "react-time-ago";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = async () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      const docRef = doc(collection(db, "posts"), id);

      await setDoc(docRef, {read: true}, {merge: true});
      navigate("/chats/view")
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat-avatar" src={profilePic} />
      <div className="chat-info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          {timestamp && timestamp.toDate ? (
            <ReactTimeago date={timestamp.toDate()} />
          ) : (
            "No Date Available"
          )}
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat-readicon" />}
    </div>
  );
}

export default Chat;