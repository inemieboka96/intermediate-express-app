import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/users";

// Use PORT 4000 in case of any errors
const PORT = process.env.PORT || 4000;

const app = express();

// User Routes Handler
app.use("/users", userRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!!!");
});

// Async Error Handler (Always wrap async errors in try...catches)
app.get("/async", (req, res) => {
  try {
    throw new Error("An Error has Occurred");
  } catch (err) {
    next(err);
  }
});

// Starting Server.....
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
