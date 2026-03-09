// USER ROUTES
import express from "express";
const userRouter = express.Router();
// Import User Data
import { users } from "../data.js";

// GET '/api/users'
userRouter.get("/", (req, res) => {
  res.json(users); // Proper JSON response
});

// GET 'api/users/search?name=""'
userRouter.get("/search", (req, res) => {
  const { name, role, active } = req.query;

  let userDataAll = [...users]; // Get all the users (to avoid original data mutation)
  // Validations
  if (name) {
    // If name is found
    userDataAll = userDataAll.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (role) {
    userDataAll = userDataAll.filter((user) => user.role === role);
  }

  if (active !== undefined) {
    userDataAll = userDataAll.filter(
      (user) => user.active === (active === "true"),
    );
  }

  res.json(userDataAll);
});

// GET '/api/users/:id'
userRouter.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id)); // Get Specific user by ID
  if (user) {
    // If user not found
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Export the router
export default userRouter;
