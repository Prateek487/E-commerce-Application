const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/Users");

exports.EmailIsValid = (req, res, next) => {
  const email = req.body.Email.toLowerCase();
  if (!email.includes("@") || email.length < 5) {
    const err = new Error("Invalid Email");
    err.statusCode = 500;
    next(err);
  }
  User.findOne({ Email: email }).then((user) => {
    if (user) {
      const err = new Error("Email Already Exists");
      err.statusCode = 500;
      next(err);
    }
    req.body.Email = email;
    next();
  });
};
exports.MobileIsValid = (req, res, next) => {
  const mobile = req.body.Mobile;
  if (mobile.length !== 10) {
    const err = new Error("Invalid Mobile Number");
    err.statusCode = 500;
    next(err);
  }
  User.findOne({ Mobile: mobile }).then((user) => {
    if (user) {
      const err = new Error("Mobile Number Already Exists");
      err.statusCode = 500;
      next(err);
    }
    next();
  });
};
exports.SignUp = (req, res, next) => {
  const password = req.body.Password;
  bcrypt
    .hash(password, 12)
    .then((hashedpass) => {
      const user = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
        Photo: req.file.path,
        Password: hashedpass,
      });
      return user.save();
    })
    .then((result) => {
      const token = jwt.sign(
        { Email: req.body.Email, UserId: result._id.toString() },
        "SecretKeyForSecurityPurpose",
        { expiresIn: "1h" }
      );
      res.status(201).json({
        token: token,
        expiresIn: 3600,
        message: "User Created",
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

  User.findOne({ Email: Email })
    .then((User) => {
      if (!User) {
        const err = new Error("User does not exists");
        error.statusCode = 401;
        next(err)
        // throw error;
      }
      loadedUser = User;
      return bcrypt.compare(Password, User.Password);
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
          UserId: loadedUser._id.toString(),
        },
        "SecretKeyForSecurityPurpose",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        message: "User logged in",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.Profile = (req, res, next) => {
  const UserId = req.body.UserId;
  User.findById(UserId)
    .select("Name Email -_id")
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
exports.UpdateProfile = (req, res, next) => {
  const UpdateBody = {};
  if (req.body.Name) {
    UpdateBody.Name = req.body.Name;
  }
  if (req.body.Mobile) {
    UpdateBody.Mobile = req.body.Mobile;
  }
  if (req.file) {
    UpdateBody.Photo = req.file.path;
  }
  const UserId = req.body.UserId;
  User.findByIdAndUpdate(UserId, UpdateBody)
    .then((user) => {
      console.log(user);
      res.status(200).json({ Message: "Profile Updated" });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
exports.DeleteProfile = (req, res, next) => {
  const UserId = req.body.UserId;
  User.findByIdAndDelete(UserId)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted Account" });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
