import React, { useEffect } from "react";
import "./Preview.css";
import { useDispatch, useSelector } from "react-redux";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = async () => {
    const id = uuid();
    try {
      await addDoc(collection(db, "posts"), {
        id,
        image: cameraImage,
        username: "emannn",
        read: false,
        profilePic: user.profilePic,
        timestamp: serverTimestamp(),
      })
      console.log("Image successfully uploaded to Firestore");
      navigate("/chats");
      
    } catch (error) {
      console.error("Error uploading image to Firestore:", error);
      
    }
  };

    return (
      <div className="preview">
        <CloseIcon onClick={closePreview} className="preview-close" />
        <div className="preview-toolbarright">
          <TextFieldsIcon />
          <CreateIcon />
          <NoteIcon />
          <MusicNoteIcon />
          <AttachFileIcon />
          <CropIcon />
          <TimerIcon />
        </div>
        {cameraImage && <img src={cameraImage} alt="preview" />}
        <div onClick={sendPost} className="preview-footer">
          <h2>Send Now</h2>
          <SendIcon fontSize="small" className="preview-sendicon" />
        </div>
      </div>
    );
  };


export default Preview;
