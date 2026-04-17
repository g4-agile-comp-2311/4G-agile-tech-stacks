import { useState } from "react";
import Bunny from "./components/Bunny.jsx";
import Items from "./components/Items.jsx";

function App() {
  const [relationship, setRelationship] = useState("feels neutral about you");

  const emotions = ["Happy", "Scared", "Sad", "Hyper!", "Disgusted", "Excited"];

  const [emotion, setEmotion] = useState(
    emotions[Math.floor(Math.random() * emotions.length)],
  );

  const handleItemClick = async (item, newEmotion) => {
    setEmotion(newEmotion);

    try {
      const res = await fetch("http://localhost:3001/api/interact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      });

      const data = await res.json();

      console.log(data);

      if (data.status) {
        setRelationship(data.status);
      } else {
        setRelationship("feels neutral about you");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleClear = async () => {
    try {
      await fetch("http://localhost:3001/api/clear", {
        method: "DELETE",
      });
      setRelationship("feels neutral about you");
      console.log("Database cleared");
    } catch (err) {
      console.error("Failed to clear DB:", err);
    }
  };

  return (
    <>
      <Bunny emotion={emotion} />
      <Items onItemClick={handleItemClick} />
      <p id='reputation'>Bunny {relationship}</p>
      <button class='button' onClick={handleClear}>Clear Bunny's Memory</button>
    </>
  );
}

export default App;
