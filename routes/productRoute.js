import express from "express";
import { createProduct } from "../controllers/productModel.js";
import { isAuth } from "../middleware/isAuth.js";


const router = express.Router();

// All Product Routers
router.post("/product/created", isAuth, createProduct,);


export default router;