const router = require("express").Router();
const knex = require("../config/db");
const Order = require("../controllers/order");
const Product = require("../controllers/product");
const User = require("../controllers/user");
const Transaction = require("../controllers/transaction");

import { v2 as cloudinary } from "cloudinary";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/user/");
  },
  filename: (req, file, cb) => {
    const filename = `${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// route for uploading the image
router.post("/v1/store-image", upload.single("file"), (req, res) => {
  User.uploadUserImage(req, res);
});

// google login
router.post("/v1/googleUser", (req, res) => {
  User.googleUser(req, res);
});

// register a new user
router.post("/v1/user", (req, res) => {
  User.createUser(req, res);
});

// get all users
router.get("/v1/allUsers", (req, res) => {
  User.getAllUsers(req, res);
});

// login an existing user
router.post("/v1/login", (req, res) => {
  User.getAUser(req, res);
});

// create orders with user Id
router.post("/v1/orderWithUserId", (req, res) => {
  Order.getOrderWithUserId(req, res);
});

// get orders from a particular user id
router.get("/v1/orders", (req, res) => {
  Order.getOrder(req, res);
});

// create order {add item to cart}
router.post("/v1/order", (req, res) => {
  Order.createOrder(req, res);
});

// update an order
router.patch("/v1/update-an-order/:id", (req, res) => {
  Order.updateOrder(req, res);
});

// create orders in the cart icon
router.post("/v1/orders-with-userId", (req, res) => {
  Order.getOrders(req, res);
});

// delete order with user id
router.delete("/v1/deleteOrders", (req, res) => {
  Order.deleteOrders(req, res);
});

// delete a single order by id
router.delete("/v1/deleteAnOrder/:id", (req, res) => {
  Order.deleteOrder(req, res);
});

router.patch("/v1/order/:id", (req, res) => {
  Order.updateOrder(req, res);
});

const Productstorage = multer
  .memoryStorage
  // {
  // destination: (req, file, cb) => {
  //   cb(null, "public/uploads/products/");
  // },
  // filename: (req, file, cb) => {
  //   const filename = `${file.originalname}`;
  //   cb(null, filename);
  // },
  // }
  ();

const Productupload = multer({ storage: Productstorage });

// route for uploading the product image
router.post(
  "/v1/store-product-image",
  Productupload.single("file"),
  (req, res) => {
    Product.uploadProductImage(req, res);
  }
);

// add a new product
router.post("/v1/product", (req, res) => {
  Product.addProduct(req, res);
});

//get all products
router.get("/v1/products", (req, res) => {
  Product.getProducts(req, res);
});

// get all admin
router.get("/Alladmin", async (req, res) => {
  try {
    const admin = await knex("admin").select("*");
    return res.json(admin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//login admin user
router.post("/login", async (req, res) => {
  try {
    //deconstructing email from request body
    const { email, password } = req.body;

    // Query the database to find admin by email and password
    const admin = await knex("admin").where({ email }).first();
    const adminPassword = await knex("admin").where({ password }).first();

    if (admin && adminPassword) {
      // admin found, send it as a response
      res.status(200).json(admin);
    } else {
      // admin not found
      res.status(404).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// payment
router.post("/v1/create-payment-intent", (req, res) => {
  Transaction.paymentIntent(req, res);
});

// payment
router.get("/v1/config", (req, res) => {
  Transaction.paymentConfig(req, res);
});

module.exports = router;

//register new user
// router.post('/user', async (req, res) => {
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     if (!email) {
//       return res.status(400).json({ error: 'email is required' });
//     }

//     if (!name) {
//       return res.status(400).json({ error: 'name is required' });
//     }
//     if (!password) {
//       return res.status(400).json({ error: 'password is required' });
//     }

//     //check if email is already used
//     const user = await knex('admin').where({ email }).first();

//     if (user) {
//       res.status(409).json({ message: 'email already exist' });
//     } else {
//       const userId = await knex('admin').insert({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       });

//       const user = await knex('admin').where({ email }).first();
//       const token = {
//         tokenKey: "7-11ee-be56-0242ac120002 ",
//         user
//       }
//       return res.status(201).json(token);
//     }

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'failed to register user' });
//   }
// });
