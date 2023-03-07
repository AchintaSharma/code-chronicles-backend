//import npm modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import configs
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");

//import init script
const init = require("./init");

//start express app
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db connection
mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("### Error while connecting to MongoDB ####");
});
db.once("open", () => {
  console.log("#### Connected to MongoDB ####");
  init();
});

//plug roiutes
// require("./routes/auth.route")(app);
// require("./routes/user.route")(app);

//Start app
app.listen(serverConfig.PORT, () => {
  console.log(
    `#### Invoice Generator app running on Server at Port No. : ${serverConfig.PORT} ####
#### Visit app at http://localhost:${serverConfig.PORT} ####`
  );
});
