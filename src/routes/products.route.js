import express from "express";

import * as controller from '../controllers/products.controller.js';

const router = express.Router();

router.get("/products/:PRODUCT_ID", controller.getProductById);

export default router;