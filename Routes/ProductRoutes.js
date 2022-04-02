const express = require("express");
const { orderProduct, orderIsValid } = require("../Controllers/OrderController");
const { getProducts } = require("../Controllers/ProductsController");

const UserController = require("../Controllers/UserController");
const IsAuth = require("../Middleware/IsAuth")

const router = express.Router();

router.get("/products",IsAuth,getProducts);
router.post("/orderproduct",IsAuth,orderIsValid,orderProduct);

module.exports = router;
