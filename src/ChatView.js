import React, { useEffect } from "react";
import "./ChatView.css";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "./features/appSlice";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      navigate("/chats");
    }
  }, [selectedImage, navigate]);

  return (
    <div className="chatview">
      {selectedImage ? (
        <img
          src={selectedImage}
          onClick={() => navigate("/chats")}
          alt="Selected"
        />
      ) : (
        <p>No image available</p>
      )}
     <div className="chatview-timer">
     <CountdownCircleTimer
        isPlaying
        duration={10}
        strokeWidth={6}
        size={50}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {({ remainingTime }) => {
          if (remainingTime === 0) {
            navigate("/chats");
          } return remainingTime;
        }}
      </CountdownCircleTimer>
     </div>
    </div>
  );
}

export default ChatView;
