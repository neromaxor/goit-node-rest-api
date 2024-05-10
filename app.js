import contactsRouter from "./routes/contactsRouter.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

const DB_URI =
  "mongodb+srv://student-3:32$teU5HeAcX_*A@cluster0.2sd7feu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.info("Database connection successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Припиняє виконання програми з кодом помилки
  }
}

run().catch((error) => console.error());

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
