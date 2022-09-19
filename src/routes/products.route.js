import express from "express";

import * as controller from '../controllers/products.controller.js';
import * as middleware from '../middlewares/products.middleware.js';

const router = express.Router();

router.get("/products/:PRODUCT_ID", middleware.verifyProduct, controller.getProductById);
router.get("/products", controller.getProducts);
router.post("/products", controller.setProduct);

export default router;