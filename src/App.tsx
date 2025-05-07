//import { useState } from "react";
//import Button from "./components/Button";
//import CameraFeed from "./components/CameraFeed";
import Camera from "./components/Camera";

//If testing locally const BACKEND_URL = "http://127.0.0.1:8000"; //use ipconfig to find SERVER IP
const BACKEND_URL = "http://vista-server.ddns.net"; //Comment out if not test production

function App() {
  const toggleLED = async (on: boolean) => {
    const endpoint = on ? "/api/led/on/" : "/api/led/off/";
    try {
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Remote LED Control</h1>
      <button onClick={() => toggleLED(true)}>Turn On</button>
      <button onClick={() => toggleLED(false)} style={{ marginLeft: "1rem" }}>
        Turn Off
      </button>
      <Camera />
    </div>
  );
}

export default App;
