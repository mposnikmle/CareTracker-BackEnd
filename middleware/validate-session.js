const jwt = require("jsonwebtoken");
const Staff = require("../models/staff.model")


const validateSession = async (req, res, next) => {
    try {
        // ! 1. extract the token from the headers
        const token = req.headers.authorization;
        // console.log("token" , token);
        // ! 2. verify and decode the token
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET)
        // console.log("decodedToken", decodedToken);

        // ! 3. check the database to see if the user is active
        const staff = await Staff.findById(decodedToken.id);

        if(!staff) {
            throw new Error("staff not found")
        }
        req.staff = staff;

        return next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = validateSession;