import React from "react";
import "./App.css";
import WebCamCapture from "./WebCamCapture";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app-body">
          <Routes>
            <Route path="/" element={<WebCamCapture />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
