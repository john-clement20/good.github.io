import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [draggedText, setDraggedText] = useState("");
  const [droppedText, setDroppedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleDragStart = (e) => {
    console.log('targeted value' + e.target.value)
    setDraggedText(e.target.value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDroppedText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://example.com/api", {
        draggedText,
        droppedText,
      });
      setResponseText(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glassmorphism-box">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Drag and Drop Input Type Text</h1>
          <div className="input-group">
            <input
              type="text"
              value="hello man"
              // value={draggedText}
              onDragStart={handleDragStart}
              draggable
              className="input"
            />
            <span>Drag me</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={droppedText}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="input"
            />
            <span>Drop here</span>
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <div className="response">{responseText}</div>
        </form>
      </div>
    </div>
  );
}

export default App;
