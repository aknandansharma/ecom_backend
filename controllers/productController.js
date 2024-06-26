import { ProductModel } from "../models/productModel.js";
import { rm } from "fs";

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
                message:
                    "All fields (title, description, category, price, image) are required.",
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

// All Products
export const allProducts = async (req, res) => {
    try {
        const { search = "", category, price, page = 1 } = req.query;

        // Initialize filter object
        const filter = {};

        // Add search filter
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        // Add price filter
        if (price) {
            filter.price = { $gte: Number(price) };
        }

        // Add category filter
        if (category) {
            filter.category = category;
        }

        // Set pagination parameters
        const limit = 4;
        const skip = (page - 1) * limit;

        // Execute queries in parallel
        const [countProduct, products, categories, mostSelling] =
            await Promise.all([
                ProductModel.countDocuments(filter),
                ProductModel.find(filter)
                    .sort("-createdAt")
                    .limit(limit)
                    .skip(skip),
                ProductModel.distinct("category"),
                ProductModel.find().sort({ sold: -1 }).limit(3),
            ]);

        // Calculate total pages
        const totalPages = Math.ceil(countProduct / limit);

        // Send response
        res.json({ products, totalPages, categories, mostSelling });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// search single products.
export const singleProduct = async(req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json({ product });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Admin Products
export const adminProduct = async (req, res) => {
    try {
      const products = await ProductModel.find();
  
      res.json({ products });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// Delete Products
export const deleteProduct = async (req, res) => {
    try {
      //this route is for admin
      if (req.user.role !== "admin")
        return res.status(403).json({
          message: "Unauthorized", // condition for checking user role
        });
      const product = await ProductModel.findById(req.params.id);
  
      rm(product.image, () => {
        console.log("Image deleted"); //this is to delete product image from uploads folder
      });
  
      await product.deleteOne();
  
      res.json({
        message: "Product deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };