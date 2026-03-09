// PRODUCTS ROUTER
import express from "express";
import { products } from "../data.js";

const productRouter = express.Router();

// GET '/api/products' - return all products
productRouter.get("/", (req, res) => {
  res.json(products);
});

// GET '/api/products/search'
productRouter.get("/search", (req, res) => {
  const { name, brand, category, inStock } = req.query;

  let productDataAll = [...products];

  if (name) {
    productDataAll = productDataAll.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (brand) {
    productDataAll = productDataAll.filter(
      (product) => product.brand === brand,
    );
  }

  if (category) {
    productDataAll = productDataAll.filter(
      (product) => product.category === category,
    );
  }

  if (inStock !== undefined) {
    productDataAll = productDataAll.filter(
      (product) => product.inStock === (inStock === "true"),
    );
  }

  res.json(productDataAll);
});

// GET '/api/products/:id' - return a product by ID
productRouter.get("/:id", (req, res) => {
  const product = products.find((product) => product.id === parseInt(req.params.id)); // Get Exact Product by ID
  if (product) {
    // If not found
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

export default productRouter;