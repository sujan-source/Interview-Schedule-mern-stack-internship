const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const authMiddleware = require("../middleware/authMiddleware");

// POST – Create interview
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can schedule interviews" });
  }
  try {
    console.log("POST /api/interviews - Received:", req.body);
    const { candidate, interviewer, position, date, startTime, type } = req.body;

    // Generate mock meeting link if virtual
    let meetingLink = "";
    if (["zoom", "teams"].includes(type)) {
      meetingLink = `https://${type}.us/j/${Math.floor(Math.random() * 1000000000)}`;
    }

    const interview = new Interview({
      ...req.body,
      meetingLink
    });

    await interview.save();
    console.log("Interview saved successfully");
    res.status(201).json(interview);
  } catch (err) {
    console.error("Error creating interview:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET – Get all interviews (with stats)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "user") {
      // Find by candidate ID or candidate Name
      query = { $or: [{ candidate: req.user.id }, { candidate: req.user.name }] };
    } else if (req.user.role === "interviewer") {
      // Find by interviewer ID or interviewer Name
      query = { $or: [{ interviewer: req.user.id }, { interviewer: req.user.name }] };
    }
    // Admin sees all

    const interviews = await Interview.find(query)
      .sort({ date: 1, startTime: 1 });

    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Analytics
router.get("/analytics", authMiddleware, async (req, res) => {
  try {
    const stats = await Interview.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const performance = await Interview.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$round",
          avgRating: { $avg: "$feedback.rating" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ stats, performance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT – Update/Feedback
router.put("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "interviewer") {
    return res.status(403).json({ message: "Only admins and interviewers can edit interviews" });
  }
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
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can delete interviews" });
  }
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

