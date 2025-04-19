import express from "express";
import { createPost, getAllproducts, updateProduct, deleteProduct } from "../controllers/products.controller.js";
const router = express.Router();


router.post("/api/create-product", createPost);
router.get("/api/products", getAllproducts);
router.put("/api/products/:pid", updateProduct);
router.delete("/api/products/:pid", deleteProduct);

export default router;
