import mongoose from "mongoose";

const conn = mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "bitirme",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.log("error" + err.message);
  });

export default conn;
