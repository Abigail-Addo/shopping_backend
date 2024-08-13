// const Order = require('../controllers/order')
// const Product = require('../controllers/product')
// const User = require('../controllers/user')

// const router = require('express').Router();

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/user/');
//     },
//     filename: (req, file, cb) => {
//         const filename = `${file.originalname}`;
//         cb(null, filename);
//     }
// });

// const upload = multer({ storage: storage })

// // route for uploading the image
// router.post('/v1/store-image', upload.single('file'), (req, res) => {
//     User.uploadUserImage(req, res);
// });

// // google login
// router.post('/v1/googleUser', (req, res) => {
//     User.googleUser(req, res);
// });

// // register a new user
// router.post('/v1/user', (req, res) => {
//     User.createUser(req, res);
// });

// // get all users
// router.get('/v1/allUsers', (req, res) => {
//     User.getAllUsers(req, res);
// });

// // login an existing user
// router.post('/v1/login', (req, res) => {
//     User.getAUser(req, res);
// });

// // create orders with user Id
// router.post('/v1/orderWithUserId', (req, res) => {
//     Order.getOrderWithUserId(req, res);
// });

// // get orders from a particular user id
// router.get('/v1/orders', (req, res) => {
//     Order.getOrder(req, res);
// });

// // create order {add item to cart}
// router.post('/v1/order', (req, res) => {
//     Order.createOrder(req, res)
// });

// // update an order
// router.patch('/v1/update-an-order/:id', (req, res) => {
//     Order.updateOrder(req, res)
// });

// // create orders in the cart icon
// router.post('/v1/orders-with-userId', (req, res) => {
//     Order.getOrders(req, res)
// });

// // delete order with user id
// router.delete('/v1/deleteOrders', (req, res) => {
//     Order.deleteOrders(req, res);
// })

// // delete a single order by id
// router.delete('/v1/deleteAnOrder/:id', (req, res) => {
//     Order.deleteOrder(req, res);
// })

// router.patch('/v1/order/:id', (req, res) => {
//     Order.updateOrder(req, res)
// });

// const Productstorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/products/');
//     },
//     filename: (req, file, cb) => {
//         const filename = `${file.originalname}`;
//         cb(null, filename);
//     }
// });

// const Productupload = multer({ storage: Productstorage })

// // route for uploading the product image
// router.post('/v1/store-product-image', Productupload.single('file'), (req, res) => {
//     Product.uploadProductImage(req, res);
// });

// // add a new product
// router.post('/v1/product', (req, res) => {
//     Product.addProduct(req, res);
// });

// //get all products
// router.get('/v1/products', (req, res) => {
//     Product.getProducts(req, res)
// });

// module.exports = router;
