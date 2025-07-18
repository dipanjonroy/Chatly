const mongoose = require("mongoose");

module.exports.connectToDb = async () => {
  mongoose
    .connect(process.env.DBURL)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((error) => console.log(error));
};
