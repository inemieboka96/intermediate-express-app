// PRODUCTS ROUTER
import express from "express";
import { products } from "../data.js";

const productRouter = express.Router();

// GET '/products' - return all products
productRouter.get("/", (req, res) => {
  res.json(products);
});

// GET '/products/:id' - return a product by ID
productRouter.get(":id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id)); // Get Exact Product by ID
  if (product) { // If not found
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

export default productRouter;