import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conn from "./config/db.js";
import route from "./routes/Auth.js";
dotenv.config();
const app = express();
conn;

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", route);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
