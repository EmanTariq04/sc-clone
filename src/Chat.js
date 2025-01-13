import React from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import ReactTimeago from "react-time-ago";

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  return (
    <div className="chat">
      <Avatar className="chat-avatar" src={profilePic} />
      <div className="chat-info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
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
