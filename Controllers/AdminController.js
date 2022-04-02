const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../Models/Admin");

exports.EmailIsValid = (req, res, next) => {
  const email = req.body.Email.toLowerCase();
  if (!email.includes("@") || email.length < 5) {
    const err = new Error("Invalid Email");
    err.statusCode = 500;
    next(err);
  }
  Admin.findOne({ Email: email }).then((admin) => {
    if (admin) {
      const err = new Error("Email Already Exists");
      err.statusCode = 500;
      next(err);
    }
    req.body.Email = email;
    next();
  });
};
exports.SignUp = (req, res, next) => {
  const password = req.body.Password;
  bcrypt
    .hash(password, 12)
    .then((hashedpass) => {
      const admin = new Admin({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: hashedpass,
      });
      return admin.save();
    })
    .then((result) => {
      const token = jwt.sign(
        { Email: req.body.Email, UserId: result._id.toString() },
        "SecretKeyForSecurityPurposeAdmin",
        { expiresIn: "1h" }
      );
      res.status(201).json({
        token: token,
        expiresIn: 3600,
        message: "Admin Created",
        userId: result._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.SignIn = (req, res, next) => {
  const Email = req.body.Email.toLowerCase();
  const Password = req.body.Password;

  Admin.findOne({ Email: Email })
    .then((admin) => {
      if (!admin) {
        const err = new Error("Admin does not exists");
        error.statusCode = 401;
        throw error;
      }
      loadedAdmin = admin;
      return bcrypt.compare(Password, admin.Password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Password Incorrect");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          Email: Email,
          UserId: loadedAdmin._id.toString(),
        },
        "SecretKeyForSecurityPurposeAdmin",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        message: "Admin logged in",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

