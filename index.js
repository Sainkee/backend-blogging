const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./route/postRoute/post.route");
require("dotenv").config();

console.log(process.env);

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.SECRET_STRING);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.use(router);
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
