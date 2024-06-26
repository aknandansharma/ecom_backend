import express from "express";
import { createProduct, allProducts, singleProduct, adminProduct, deleteProduct } from "../controllers/productController.js";
import { isAuth } from "../middleware/isAuth.js";


const router = express.Router();

// All Product Routers
router.post("/product/created", isAuth, createProduct,);
router.get("/product/all", allProducts);
router.get("/product/:id", singleProduct);
router.get("/product/admin/all", adminProduct);
router.delete("/product/:id", isAuth, deleteProduct);



export default router;