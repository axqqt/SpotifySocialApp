const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const accessToken = process.env.accessToken;
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;


router
  .get("/", async (req, res) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((r)=>{
        res.json(r.data);
      }).catch((e)=>{
        res.json(e);
      });
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve top artists" });
    }
  })
  .post("/", async (req, res) => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: clientID,
            password: clientSecret,
          },
          params: {
            grant_type: "client_credentials",
          },
        }
      );
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
