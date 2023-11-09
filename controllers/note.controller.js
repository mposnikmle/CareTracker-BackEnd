// /note/add	POST
// /note/updatebyID	PATCH
// /note/deletebyID	DELETE
// /note/view-note/:id	GET

const router = require("express").Router();
const Note = require("../models/note.model");

// Add a note
router.post("/add", async (req, res) => {
  try {
    const { date, firstName, lastName, staffID, residentID } = req.body;
    const note = new Note({
      date: date,
      firstName: firstName,
      lastName: lastName,
      staffID: staffID,
      residentID: residentID,
    });
    const newNote = await note.save();
    res.json({ message: "new note created and connecting", name: newNote });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// Todo: View a note by id look over the populate function
router.get("/view-note/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id).populate("residentID");
    res.json({ message: "Success from get", note: note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View all notes
router.get("/all-notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ message: "Showing all notes", Note: notes });
  } catch (error) {
    res.status(500).json({ message: "Can not view all notes" });
  }
});

//updating by note ID but am considering resident ID as more useful (discuss)
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const note = await Note.findById(id, data, options);

    if (!note) {
      throw new Error("Note not found");
    }
    res.json({ message: "working", id: id, data: data });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.deleteOne({ _id: id });

    res.json({
      message:
        note.deletedCount === 1
          ? "Success, note was deleted"
          : "Error, note was not found",
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

module.exports = router;
