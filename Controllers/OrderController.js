const Order = require("../Models/Orders");
const Product = require("../Models/Products");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
exports.orderIsValid = (req, res, next) => {
  const qty = req.body.Quantity;
  Product.findOne({ ProductId: req.body.ProductId })
    .then((product) => {
      if (!product) {
        const err = new Error("Product not found");
        err.statusCode = 404;
        next(err);
      } else if (product && product.Quantity < qty) {
        const err = new Error("Not enough in stock");
        err.statusCode = 500;
        next(err);
      } else {
        req.body.OrderBill = +qty * +product.Price;
        product.Quantity -= qty;
        product.save().then((result) => {
          console.log(result);
          next();
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.orderProduct = (req, res, next) => {
  const ProductId = req.body.ProductId;
  const UserId = req.body.UserId;
  const Address = req.body.Address;
  const OrderBill = req.body.OrderBill;
  const order = new Order({ ProductId, UserId, Address, OrderBill });

  order.save().then((result) => {
    console.log(result);
    res.status(200).json({ message: "Item Ordered" });
  });
};

exports.getOrdersByDate = (req, res, next) => {
  const startDate = new Date(req.body.OrderedOn);
  const lastDate = new Date(req.body.OrderedOn);
  lastDate.setDate(lastDate.getDate() + 1);
  Order.find({
    OrderedOn: { $gte: new Date(startDate), $lt: new Date(lastDate) },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOrdersByUserId = (req, res, next) => {
  Order.find({ UserId: ObjectId(req.body.UserId) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getOrderByOrderId = (req, res, next) => {
  Order.findOne({ _id: req.body.OrderId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};
