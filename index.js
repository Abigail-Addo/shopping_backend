//app requirements and dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./router/router");
require("dotenv").config();

// for storing images
import { v2 as cloudinary } from "cloudinary";

// const objection = require('./router/routes')
const knex = require("./config/db");

// const stripe = require('./router/route')

const PORT = process.env.PORT; //server port

//middleware
//To parse json data
app.use(bodyParser.json());
//allow origin access
app.use(
  cors({
    origin: "*",
  })
);
//add public folder to the client
app.use(express.static(path.join(__dirname, "./public")));

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
});

//api
app.use("/api", routes);
// app.use('/shop', objection)
// app.use('/stripe', stripe)

//start app on this port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
