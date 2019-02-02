const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/basic-auth", { useNewUrlParser: true })
  .then(x => console.log("database created"))
  .catch(err => console.log(err));
