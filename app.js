import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
// Routes
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import { fileURLToPath } from "url";

// Use PORT 4000 in case of any errors
const PORT = process.env.PORT || 3000;

const app = express();

// Path Variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route Handlers
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Serving Public Files
app.use(express.static(path.join(__dirname, "public")));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Log any errors
  res.status(500).send("Something Broke!!!"); // Internal Server Error
});

// Async Error Handler (Always wrap async errors in try...catches⚠️)
app.get("/async", (req, res) => {
  try {
    throw new Error("An Error has Occurred");
  } catch (err) {
    next(err);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
