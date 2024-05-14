import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Завантажуємо змінні середовища з файлу .env

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connection successfully"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
