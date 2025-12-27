const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const authMiddleware = require("../middleware/authMiddleware");

// POST – Create interview
router.post("/", authMiddleware, async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();
    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET – Get all interviews
router.get("/", authMiddleware, async (req, res) => {
  try {
    let query = {};

    // If regular user, only show their own interviews
    if (req.user.role !== "admin") {
      // SAFETY CHECK: If name is missing or empty, return nothing
      if (!req.user.name || req.user.name.trim() === "") {
        return res.json([]);
      }

      // Match candidate name (case insensitive)
      query = { candidate: { $regex: new RegExp(req.user.name, "i") } };
    }

    const interviews = await Interview.find(query);
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT – Update interview by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(updatedInterview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE – Delete interview by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedInterview = await Interview.findByIdAndDelete(req.params.id);

    if (!deletedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json({ message: "Interview deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

