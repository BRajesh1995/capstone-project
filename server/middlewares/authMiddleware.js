const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("req headers", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    const verifedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verfiedToken", verifedToken);
    req.body.userId = verifedToken.userId;
    next();
  } catch (error) {
    return res.status(401).send({ success: false, message: "Token Invalid" });
  }
};

module.exports = auth;
