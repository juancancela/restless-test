require("dotenv").config();
const express = require("express");
const app = express();
const root = require("./routes/root.router");
const { port } = require("./utils/props.utils").getProps();
const { log } = console;

app.use("/", root);

app.listen(port, () =>
  log(`resless-test listening at port: ${port}`)
);