const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const home = require("./routes/home");
const { Logger } = require("./middleware/logEvents");
const login = require("./routes/login");
const mongoose = require("mongoose");
const cluster = process.env.CLUSTER;
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(Logger);
app.use("/home", home);
app.use("/login", login);
if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
app.use(express.static(path.join(__dirname, "public")));

app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ Alert: "404 Error" });
  } else {
    res.type("txt").send("404 Error");
  }
});

async function start() {
  await mongoose.connect(cluster, { useNewURLParser: true });

  try {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
