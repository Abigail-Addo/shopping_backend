const Order = require("../model/order");
const Product = require("../model/product");

// get orders from a particular user id
exports.getOrder = async (req, res) => {
  try {
    // retrieve the user_id from the query parameters
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }
    // Query the database to retrieve all orders for the given customer
    const orders = await Order.query().where("user_id", user_id).orderBy("id");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this customer" });
    }
    // Return the orders as a JSON response
    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// create orders in the cart icon
exports.getOrders = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res
        .status(409)
        .json({ message: "request must have have user_id " });
    }
    const order = await Order.query().where("user_id", user_id).orderBy("id");

    if (!order) {
      throw new Error("user id doesnt exit");
    }
    res.status(200).json({ message: "orders from customer", order });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// create order {add item to cart}
exports.createOrder = async (req, res) => {
  try {
    const { product_id, user_id } = req.body;

    if (product_id != "" || user_id != "") {
      if (typeof (product_id == Number) || typeof (user_id == Number)) {
        // getting the price
        const product = await Product.query().findById(product_id);

        if (product.price) {
          //check if order is already inserted
          const productId = await Order.query()
            .where({ product_id: product_id, user_id: user_id })
            .first();
          if (productId) {
            return res
              .status(409)
              .json({ message: "product already added to cart" });
          }
          // product.id while false
          const order = await Order.query().insertGraph({
            product_id: product_id,
            user_id: user_id,
            price: product.price,
          });
          if (!order) {
            throw new Error("Failed to create order");
          }
          return res.status(200).json(order);
        }
      }
    }
    return res
      .status(409)
      .json({ message: "cannot create order without user id or product id" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.createOrder = async (req, res) => {
//     try {
//         const { product_id, user_id, quantity } = req.body;

//         if (!product_id || !user_id || !quantity) {
//             return res.status(400).json({ message: "Missing product_id, user_id, or quantity" });
//         }

//         // Getting the price of the product
//         const product = await Product.query().findById(product_id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Calculate the total price based on quantity and product price
//         const totalPrice = product.price * quantity;

//         // Check if the order already exists
//         const existingOrder = await Order.query()
//             .where({ product_id, user_id })
//             .first();

//         if (existingOrder) {
//             return res.status(409).json({ message: "Product already added to cart" });
//         }

//         // Create the order with the calculated total price
//         const order = await Order.query().insertGraph({
//             product_id,
//             user_id,
//             price: totalPrice, // Set the total price
//             quantity // Set the quantity
//         });

//         if (!order) {
//             throw new Error("Failed to create order");
//         }

//         return res.status(200).json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// }

// exports.updateOrder = async (req, res) => {
//     try {
//         const { product_id, user_id, quantity } = req.body;

//         if (!product_id || !user_id || !quantity) {
//             return res.status(400).json({ message: "Missing product_id, user_id, or quantity" });
//         }

//         // Getting the price of the product
//         const product = await Product.query().findById(product_id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Calculate the total price based on quantity and product price
//         const totalPrice = product.price * quantity;

//         // Create the order with the calculated total price
//         const order = await Order.query().update({
//             product_id,
//             user_id,
//             price: totalPrice,
//             quantity
//         });

//         if (!order) {
//             throw new Error("Failed to create order");
//         }

//         return res.status(200).json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// }

// create orders with user Id

// exports.updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params; // Get the order_id from route parameters
//     if (!id) {
//       return res.status(400).json({ message: "Missing or undefined id" });
//     }

//     const { product_id, user_id, quantity } = req.body;
//     if (!product_id || !user_id || !quantity) {
//       return res.status(400).json({
//         message: "Missing order ID, product ID, user ID, or quantity",
//       });
//     }

//     const product = await Product.query().findById(product_id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const totalPrice = product.price * quantity;

//     const updatedOrder = await Order.query()
//       .patch({
//         price: totalPrice,
//         quantity,
//       })
//       .where("product_id", product_id)
//       .where("user_id", user_id);

//     if (!updatedOrder) {
//       throw new Error("Failed to update order");
//     }

//     return res.status(200).json(totalPrice);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get the order_id from route parameters
    if (!id) {
      return res.status(400).json({ message: "Missing or undefined id" });
    }

    const { quantity } = req.body;
    if (!quantity ) {
      return res.status(400).json({
        message: "Missing product",
      });
    }

    const product = await Product.query().findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = product.price * quantity;

    // Update the order based on its unique identifier (id)
    const updatedOrder = await Order.query()
      .findById(id)
      .patch({
        price: totalPrice,
        quantity
      });

    if (!updatedOrder) {
      throw new Error("Failed to update order");
    }

    return res.status(200).json(totalPrice); // Respond with the updated totalPrice
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOrderWithUserId = async (req, res) => {
  try {
    const { user_id } = req.body;

    const orders = await Order.query()
      .where("user_id", user_id)
      .withGraphFetched("products")
      .orderBy("id");

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete order with user id
exports.deleteOrders = async (req, res) => {
  try {
    const { user_id } = req.query; // Get user_id from query parameters

    if (!user_id) {
      return res.status(400).json({ message: "Missing or undefined user_id" });
    }
    // Use the `where` clause to specify the condition for deletion
    const deletedOrder = await Order.query().where("user_id", user_id).delete();

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: "No orders found for this user_id" });
    }

    return res.status(200).json({ message: "Orders deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete a single order by id
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get the order_id from route parameters
    if (!id) {
      return res.status(400).json({ message: "Missing or undefined id" });
    }
    const deletedOrder = await Order.query().deleteById(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update an order by id
// exports.updateOrder = async (req, res) => {

// }
