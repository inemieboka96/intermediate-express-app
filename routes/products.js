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
    res.status(404).json({ error: `Product ${req.params.id} not found` });
  }
});

// POST '/api/products' - Create a new product
productRouter.post("/", (req, res) => {
  const { name, brand, category, price, inStock } = req.body;

  // Basic validation
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  // Create new product object
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1, // Generate new ID
    name,
    brand: brand || "Unknown",
    category: category || "General",
    price: parseFloat(price),
    inStock: inStock !== undefined ? inStock : true, // Default inStock to true
  };

  // Add to the products array (in-memory)
  products.push(newProduct);

  // Respond with the created product and 201 status
  res.status(201).json(newProduct);
});

export default productRouter;