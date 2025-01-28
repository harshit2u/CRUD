import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/UserRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);

// 404 Fallback for undefined routes
app.use((req, res) => {
  res.status(404).send({ error: "Route not found" });
});
