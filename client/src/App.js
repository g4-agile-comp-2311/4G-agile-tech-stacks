import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        username,
        password,
      });

      console.log(response.data);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const cancelHandler = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h3>Sign Up</h3>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <div className="button-group">
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;