const axios = require("axios");
require("dotenv").config();
const accessToken = process.env.accessToken;
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const userData = require("../models/userData");
const bcrypt = require("bcrypt");


async function TopArtists(req, res) {
  try {
    const response = await axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        res.json(e);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve top artists" });
  }
}

async function getUserToken(req, res) {
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
}

async function Personal(req, res) {
  try {
    const r = await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        res.json(e);
      });
  } catch (error) {
    console.error(error);
  }
}

async function saveData(req,res) {
  const { username, password } = req.body; //prone to add more arguments and change body to params (match with frontend params) when needed

  if (!username || !password) {
    return res
      .status(400)
      .json({ Alert: "username or password fields aren't filled" });
  } else {
    const foundusername = await userData.findOne({ username: username });
    if (!foundusername) {
      const cryptedPass = bcrypt.hashSync(password, 10);
      const finalUser = new userData({
        username,
        password: cryptedPass,
      });

      await finalUser.save();
      return res.status(201).json({ Alert: `User ${username} created` });
    } else {
      return res.status(409).json({ Alert: `User ${username} already exists` });
    }
  }
};

async function userProfileData(req,res){
  const users = await userData.find();
  res.json(users);
}

module.exports = { TopArtists, getUserToken, Personal, saveData,userProfileData };
