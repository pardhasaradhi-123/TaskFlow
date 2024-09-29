const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      res.status(400).send("Token not Found !");
    } else {
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = decode.user;
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Invalid Token !");
  }
};

module.exports = auth;
