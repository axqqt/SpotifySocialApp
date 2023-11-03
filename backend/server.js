const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const home = require("./routes/home");
const { Logger } = require("./middleware/logEvents");

app.use(express.json());
app.use(Logger);
app.use("/home", home);

async function start() {
  try {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
