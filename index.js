//app requirements and dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./router/router");
require("dotenv").config();

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

//api
app.use("/api", routes);
// app.use('/shop', objection)
// app.use('/stripe', stripe)

//start app on this port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
