import { useEffect, useRef, useState } from "react";

const CameraFeed = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null); //Tells react that imageSrc can be a string or null(at the start)
  const ws = useRef<WebSocket | null>(null); //Tells React that ws.current can be a WebSocket or null

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/video_feed");

    //Update when React website receives a new frame from the Django server
    ws.current.onmessage = (event) => {
      const data = event.data;
      setImageSrc("data:image/jpeg;base64," + data);
    };

    ws.current.onclose = () => {
      console.log("Disconnected WebSocket");
    };

    return () => {
      ws.current?.close(); //Closes the WebSocket connection (? is "only call if ws.current is not null or undefined")
    };
  }, []);

  return (
    <div>
      <h2>Camera Feed</h2>
      {imageSrc && <img src={imageSrc} alt="Camera" />}
    </div>
  );
  //For the &&, it means only show the img if imageSrc is not null
};

export default CameraFeed;
