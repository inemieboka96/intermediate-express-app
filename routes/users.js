// USER ROUTES
import express from "express";
const router = express.Router();

// GET '/users'
router.get("/", (req, res) => {
  res.send("All Users");
});

// GET '/users/:id'
router.get("/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Export the router
export default router;