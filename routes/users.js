// USER ROUTES
import express from "express";
const userRouter = express.Router();
// Import User Data
import { users } from "../data.js";

// GET '/api/users' - All Users
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
    res.status(404).json({ error: `User ${req.params.id} not found` });
  }
});

// POST '/api/users' - Create a new user
userRouter.post("/", (req, res) => {
  const { name, email, role, active } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Create new user object
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1, // Generate new ID
    name,
    email,
    role: role || "user", // Default role to 'user' if not provided
    active: active !== undefined ? active : true, // Default active to true if not provided
  };

  // Add to the users array (in-memory)
  users.push(newUser);

  // Respond with the created user and 201 status
  res.status(201).json(newUser);
});

// Export the router
export default userRouter;
