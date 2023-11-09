const router = require("express").Router();
const Staff = require("../models/staff.model");
const validateSession = require("../middleware/validate-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// staff register endpoint
router.post("/register", validateSession, async (req, res) => {
    try {
        const {role, firstname, lastname, email, password} = req.body;

        const staff = new Staff({
            role: role,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: bcrypt.hashSync(password, 10)
        });

        const newStaff = await staff.save();

        const token = jwt.sign({id: newStaff._id}, process.env.JWT_SECRET, {expiresIn: 7*24*60*60});

        res.json({message: "add endpoint", staff: newStaff, token, token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// staff sign-in endpoint
router.post("/signin", validateSession, async (req, res) => {
    try {
        const {email, password} = req.body;

        const staff = await Staff.findOne({email: email});

        if (!staff) {
            throw new Error("Staff member not found");
        }

        const isPasswordAMatch = await bcrypt.compare(password, staff.password);
        if (!isPasswordAMatch) {
            throw new Error("Incorrect password");
        }

        let token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 7*24*60*60});

        res.json({message: "signin endpoint", staff: staff, token: token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// view all staff endpoint
router.get("/view-all", validateSession, async (req, res) => {
    try {
        const staffMembers = await Staff.find().populate("ownerId", "firstname lastname");
        
        res.json({message: "success from view-all", staffMembers: staffMembers});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// view by ID endpoint
router.get("/view-by-id/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id;
        const staff = await Staff.findById(id).populate("ownerId", "firstname lastname");
        res.json({message: "success from view-by-id", staff: staff});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/* 
route: localhost:4000/staff/delete/:id
type: DELETE
description: delete a staff member from the db
*/
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id;

        const conditions = {
            _id: id,
            // ownerId: req.user._id
        }

        const staff = await Staff.deleteOne(conditions);

        res.json({
            message: staff.deletedCount === 1
                ? "staff member deleted"
                : "failure to delete staff member"
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// staff update endpoint
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id;
        const conditions = {
            _id: id,
            // ownerId: req.user._id
        }
        const data = req.body;
        const options = {new: true};

        const staff = await Staff.findOneAndUpdate(conditions, data, options);
        if (!staff) {
            throw new Error("Staff member not found");
        }
        res.json({message: "success from update", staff: staff});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;