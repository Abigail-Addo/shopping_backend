const Product = require("../model/product");
import { v2 as cloudinary } from "cloudinary";
const { v4: uuidv4 } = require("uuid");

// route for uploading the image
exports.uploadProductImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Upload file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "uploads/products", public_id: uuidv4() }, // Optional: specify a folder and public_id
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        )
        .end(req.file.buffer); // Pipe the file buffer to Cloudinary
    });
    console.log(result);

    const imageUrl = result.secure_url;

    res.status(200).json({
      message: "File uploaded successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ message: "Failed to upload file to Cloudinary" });
  }
};

//add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, stock, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!price) {
      return res.status(400).json({ error: "price is required" });
    }
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }
    if (!stock) {
      return res.status(400).json({ error: "stock is required" });
    }
    const product = await Product.query().insertGraph({
      name: name,
      price: price,
      stocks: stock,
      description: description,
      image: imageUrl,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "failed to add product" });
  }
};

// get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.query().select("*");
    if (!products) {
      throw new Error("failed to get products from db");
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
