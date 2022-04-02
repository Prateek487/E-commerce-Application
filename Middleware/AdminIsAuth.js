const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, "SecretKeyForSecurityPurposeAdmin");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedtoken) {
    const err = new Error("Incorrect Token");
    err.statusCode = 401;
    throw err;
  }
  req.body.Email = decodedtoken.Email;
  req.body.AdminId = decodedtoken.UserId;
  next();
};
