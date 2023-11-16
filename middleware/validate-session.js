const jwt = require("jsonwebtoken");
const Staff = require("../models/staff.model");

const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const staff = await Staff.findById(decodedToken.id);

    if (!staff) {
      throw new Error("Staff member not found");
    }

    req.staff = staff;

    return next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = validateSession;
