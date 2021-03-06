const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
//const keys = require("./config/keys");
//const DB_URI = keys.mongoDB.dbURL;
// set up express app
const app = express();

console.log(process.env.JWT_KEY);
// connect to mongodb
const DB_URI = process.env.MONGODB_URI;
console.log(DB_URI);
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
//set mongoose's Promise equal to global Promise since mongoose's Promise version is depricated
mongoose.Promise = global.Promise;
//set up static files
app.use(express.static("public"));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes"));

// error handling middleware
app.use(function (err, req, res, next) {
  console.log(err); // to see properties of message in our console
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log("server is now listening for requests");
});
