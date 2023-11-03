import React, { useState, memo } from "react";
import Axios from "axios";
import "./App.css";

function App(props) {

  const [balls, setBalls] = useState([]);

  const accessToken = `BQDyLLwVJxpEA1_ttqo4xZ3AJ8WkLyT3AIOeoFMKvE3Z60_KUSO0yjyl6sAOlSppwSyVNmddQmsj1xi8YhWrY09XjSiafC7JXKOuMc_fhiSg3654tps`;

  async function fetchBalls(e) {
    e.preventDefault();
    try {
      const response = await Axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBalls(response.data);
    } catch (error) {
      console.error(error);
      setBalls([]);
    }
  }

  return (
    <div>
      <form onSubmit={fetchBalls}>
        <p>{JSON.stringify(balls)}</p>
        <button type="submit">Find</button>
      </form>
      <br></br>
    </div>
  );
}

export default memo(App);
