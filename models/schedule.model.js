const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
    {
        // * Staff assigned to shift
        staff: {
            type: String,
            required: true
        },
        // * Shift Date
        date: {
            type: Date,
            required: true
        },
        // * Shift address
        address: {
            type: String,
            required: true
        },
        // * Starting time of shift
        shiftStart: {
            type: Date,
            required: true
        },
        // * Ending time of shift
        shiftEnd: {
            type: Date,
            required: true
        },
        // * Total hours in a shift
        hoursTotal: {
            type: Number,
            required: true
        },
        // * Type of hours - Awake/Asleep
        isAwake: {
            type: Boolean,
            required: true
        }
    }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
