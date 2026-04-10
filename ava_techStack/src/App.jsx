import { useState } from "react";
import Bunny from "./components/Bunny.jsx";
import Items from "./components/Items.jsx";

function App() {
  const emotions = [
    "Happy",
    "Scared",
    "Sad",
    "Hyper!",
    "Disgusted",
    "Excited",
  ];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  const [emotion, setEmotion] = useState(randomEmotion);
  

  return (
    <>
      <Bunny emotion={emotion} />
      <Items onItemClick={setEmotion} />
    </>
  );
}

export default App;
