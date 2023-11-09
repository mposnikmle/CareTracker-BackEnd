const router = require("express").Router();
const Schedule = require("../models/schedule.model");

router.get("/viewScheduledShifts", async (req, res) => {
    try {
        // * Retrieve all scheduled shifts
        const scheduledShifts = await Schedule.find();

        res.json({ shifts: scheduledShifts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/addShift", async (req, res) => {
    try {
        const {
            staff,
            date,
            address,
            shiftStart,
            shiftEnd,
            isAwake,
            hoursTotal
        } = req.body;

        // * Create a new Schedule instance
        const newShift = new Schedule({
            staff,
            date,
            address,
            shiftStart,
            shiftEnd,
            isAwake,
            hoursTotal
        });

        // * Save the new shift to the database
        const savedShift = await newShift.save();

        res.json({ message: "Shift Saved Successfully", shift: savedShift });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/viewShift/:id", async (req, res) => {
    try {
        const shiftId = req.params.id;

        // * Retrieve the specific shift by ID
        const shift = await Schedule.findById(shiftId);

        if (!shift) {
            return res.json({ message: "Shift not found" });
        }

        res.json({ shift });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/deleteShift/:id", async (req, res) => {
    try {
        const shiftId = req.params.id;

        // * Delete the shift from the database
        const result = await Schedule.deleteOne({ _id: shiftId });

        res.json({
            message: result.deletedCount === 1
                ? "Shift deleted successfully"
                : "Shift not found or not deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.patch("/updateShift/:id", async (req, res) => {
    try {
        const shiftId = req.params.id;
        const updateData = req.body;

        // * Update the shift in the database
        const updatedShift = await Schedule.findByIdAndUpdate(shiftId, updateData, { new: true });

        if (!updatedShift) {
            return res.json({ message: "Shift not found" });
        }

        res.json({ message: "Shift updated successfully", shift: updatedShift });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;