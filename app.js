import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import authenticate from "./middlewares/authenticate.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/contacts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/api/contacts", authenticate, contactsRouter);
app.use("/api/users", authRoutes);

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
