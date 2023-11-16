const router = require("express").Router();
const Resident = require("../models/resident.model");

// /resident/add		ADD
// /resident/remove		DELETE
// /resident/update/:id		PATCH
// /resident/viewbyID		GET
// /resident/viewbystaffassigned		GET
// /resident/viewall		GET

// Add a resident
router.post("/add", async (req, res) => {
  try {
    const {
      residentName,
      residentAddress,
      staffAssigned,
      allergy,
      residentEmergencyContact
    } = req.body;
    const resident = new Resident({
      residentName: residentName,
      residentAddress: residentAddress,
      staffAssigned: staffAssigned,
      allergy: allergy,
      residentEmergencyContact: residentEmergencyContact
    });
    const newResident = await resident.save();
    res.json({
      message: "new resident created and connecting",
      name: newResident
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// View all the residents
router.get("/view-all", async (req, res) => {
  try {
    const resident = await Resident.find();
    res.json({ message: "showing all residents", Resident: resident });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View a resident by ID
router.get("/view-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resident = await Resident.findById(id);
    res.json({ message: "Viewing Resident by ID", resident: resident });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resident by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    // const options = {new:true}
    const resident = await Resident.findByIdAndUpdate(id, body);
    res.json({
      message: "Viewing & Updating Resident by ID",
      resident: resident
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a resident by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const residentid = req.params.id;
    const result = await Resident.deleteOne({ _id: residentid });
    res.json({
      message:
        result.deletedCount === 1
          ? "Resident is deleted"
          : "Resident could not be deleted"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View that resident ID is assigned to staff ID
/* Let newUserid = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'); */
//let id = new mongoose.Types.ObjectId(addedUser);
router.get("/viewbystaffassigned/:id", (req, res) => {
  try {
    const residentid = req.params.id;
    res.json("Things are working over here");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
