const Product = require("../Models/Products");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.status(200).json(products);
  });
};

exports.addProduct = (req, res, next) => {
  const Name = req.body.Name.toLowerCase();
  const Price = req.body.Price;
  if (Name === "shirt" || Name === "tshirt") {
    const size = ["S", "L", "XL"];
    const colour = ["Red", "White", "Grey", "Blue", "Black", "Cream", "Green"];
    for (let i in size) {
      const Size = size[i];
      for (let j in colour) {
        const Colour = colour[j];
        const Quantity = 5;
        const product = new Product({
          Name,
          Colour,
          Quantity,
          Size,
          Price,
        });
        product
          .save()
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
            next(err);
          });
      }
    }
  } else {
    const Colour = req.body.Colour;
    const Quantity = req.body.Quantity;
    const Size = req.body.Size;
    const product = new Product({
      Name,
      Colour,
      Quantity,
      Size,
      Price,
    });
    product
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
  res.status(200).json({ message: "Product Added" });
};
