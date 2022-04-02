const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const Admin = require("./Routes/AdminRoutes");
const User = require("./Routes/UserRoutes");
const Product = require("./Routes/ProductRoutes");
const { mongoURL } = require("./Util/dbConfig");

const app = express();

app.use(express.json());
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.use(upload.single("image"));
app.use(User);
app.use("/admin", Admin);
app.use(Product);

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening to port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
