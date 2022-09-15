import express from "express";

import * as controller from '../controllers/products.controller.js';
import * as middleware from '../middlewares/products.middleware.js';

const router = express.Router();

router.get("/products/:PRODUCT_ID", middleware.verifyProduct, controller.getProductById);

export default router;