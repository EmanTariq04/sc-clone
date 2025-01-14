import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { db } from "./firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Chat from "./Chat";

function Chats() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="chats">
      <div className="chats-header">
        <Avatar className="chats-avatar" />
        <div className="chats-search">
          <SearchIcon />
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
    </div>
  );
}

export default Chats;
