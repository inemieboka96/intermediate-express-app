// USER ROUTES
import express from "express";
const userRouter = express.Router();
// Import User Data
import { users } from "../data.js";

// GET '/api/users'
userRouter.get("/", (req, res) => {
  res.json(users); // Proper JSON response
});

// GET '/api/users/:id'
userRouter.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id)); // Get Specific user by ID
  if (user) { // If user not found
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Export the router
export default userRouter;