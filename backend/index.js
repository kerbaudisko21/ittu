import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const app = express();
dotenv.config();

app.use();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongo disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongo connecteded asu");
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
