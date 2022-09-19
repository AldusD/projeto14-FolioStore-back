import express from "express";
import * as controller from '../controllers/products.controller.js';

const router = express.Router();

router.get("/products", controller.getProducts)
router.post("/products", controller.setProduct)

export default router;