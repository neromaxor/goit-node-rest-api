import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

// Ініціалізація додатку
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect("mongodb://localhost:27017/contacts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Маршрути
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRoutes);

// Обробка некоректних маршрутів
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Обробка помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
