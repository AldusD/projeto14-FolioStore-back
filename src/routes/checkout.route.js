import express from "express";

import * as controller from '../controllers/checkout.controller.js';
import * as middleware from '../middleware/checkout.middleware.js';

const router = express.Router();

router.post("/checkout/:USER_ID", middleware.verifyUser, controller.checkout);

export default router;