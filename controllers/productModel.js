import { ProductModel } from "../models/productModel.js";


// create product function -- ONLY ADMIN ACCESS.
export const createProduct = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      const { title, description, category, price, image } = req.body;
  
      // Check if all required fields are present and not empty
      if (!title || !description || !category || !price || !image) {
        return res.status(400).json({
          message: "All fields (title, description, category, price, image) are required.",
        });
      }
  
      const product = await ProductModel.create({
        title,
        description,
        category,
        price,
        image,
      });
  
      res.status(201).json({
        message: "Product Created",
        product,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


