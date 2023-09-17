const tokenServices = require("../services/token.services");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Bearer
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unoathorized" });
    }

    const data = tokenServices.validateAccess(token);

    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unoathorized" });
  }
};
