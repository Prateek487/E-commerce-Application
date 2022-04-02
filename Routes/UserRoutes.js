const express = require("express");

const { getOrdersByUserId } = require("../Controllers/OrderController");
const UserController = require("../Controllers/UserController");
const IsAuth = require("../Middleware/IsAuth");

const router = express.Router();

router.post(
  "/signup",
  UserController.EmailIsValid,
  UserController.MobileIsValid,
  UserController.SignUp
);
router.post("/signin", UserController.SignIn);
router.get("/profile", IsAuth, UserController.Profile);
router.get("/orders", IsAuth, getOrdersByUserId);
router.patch(
  "/profile/mobile",
  IsAuth,
  UserController.MobileIsValid,
  UserController.UpdateProfile
);
router.patch("/profile", IsAuth, UserController.UpdateProfile);
router.delete("/profile", IsAuth, UserController.DeleteProfile);

module.exports = router;
