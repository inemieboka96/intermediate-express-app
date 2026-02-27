// USER ROUTES
import express from "express";
const userRouter = express.Router();
import { users } from "../data.js";

// GET '/users'
userRouter.get("/", (req, res) => {
  res.json(users); // Proper JSON response
});

// GET '/users/:id'
userRouter.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id)); // Get Specific user by ID
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Export the router
export default userRouter;