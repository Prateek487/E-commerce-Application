const express = require("express");

const { addProduct} = require("../Controllers/ProductsController");
const { getOrderByOrderId,getOrdersByUserId, getOrdersByDate} = require("../Controllers/OrderController");
const {
  SignUp,
  EmailIsValid,
  SignIn,
} = require("../Controllers/AdminController");
const AdminIsAuth = require("../Middleware/AdminIsAuth");

const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", EmailIsValid, SignUp);
router.post("/addproducts", AdminIsAuth, addProduct);
router.post("/ordersbydate",AdminIsAuth, getOrdersByDate);
router.post("/ordersbyuser",AdminIsAuth, getOrdersByUserId);
router.post("/order",AdminIsAuth, getOrderByOrderId);
module.exports = router;
