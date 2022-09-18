import express from "express";

import * as controller from '../controllers/checkout.controller.js';

const router = express.Router();

router.get("/checkout/:USER_ID", controller.checkout);

export default router;