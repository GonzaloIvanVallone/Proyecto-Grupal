const { saveUserCart, getUserCart } = require("../Controllers/cartController");
const {
  createNewOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  updateStatus,
  getOrdersByUser
} = require("../Controllers/orderController");


const router = require("express").Router();

router.get("/", getAllOrders);

router.get("/:id", getAllOrders);

router.post("/", createNewOrder);

router.post("/cart", saveUserCart);

router.get("/cart", getUserCart);

router.get("/user/:userid", getOrdersByUser);

router.put("/:id", updateOrder);

router.put("/status/:id", updateStatus);

router.delete("/:id", deleteOrder);

module.exports = router;
