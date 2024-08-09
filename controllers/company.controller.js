const router = require("express").Router();
const Company = require("../models/company.model");

// Add a company
router.post("/add", async (req, res) => {
  try {
    const { companyName, companyID, address, activeInDropDown } = req.body;
    const company = new Company({
      companyName: companyName,
      companyID: companyID,
      address: address,
      activeInDropDown: activeInDropDown,
    });
    const newCompany = await company.save();
    res.json({
      message: "new company created and connecting",
      name: newCompany,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// View all companies
router.get("/all-companies", async (req, res) => {
  try {
    const company = await Company.find();
    res.json({ message: "Showing all companies", Company: company });
  } catch (error) {
    res.status(500).json({ message: "Can not view all companies" });
  }
});

// updating company by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const company = await Company.findByIdAndUpdate(id, data, options);

    if (!company) {
      throw new Error("Company not found");
    }
    res.json({ message: "working", id: id, data: data });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// delete company by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.deleteOne({ _id: id });

    res.json({
      message:
        company.deletedCount === 1
          ? "Success, company was deleted"
          : "Error, company was not found",
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

module.exports = router;
