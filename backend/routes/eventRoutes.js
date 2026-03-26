const express = require("express");
const router = express.Router();

// temporary in-memory events
let events = [];

// GET all events
router.get("/", (req, res) => {
  res.json(events);
});

// CREATE event
router.post("/", (req, res) => {
  const newEvent = {
    _id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    createdBy: req.body.createdBy,
    participants: []
  };

  events.push(newEvent);
  res.json(newEvent);
});

// UPDATE event
router.put("/:id", (req, res) => {
  const event = events.find(e => e._id === req.params.id);
  if (!event) return res.status(404).json({ msg: "Event not found" });

  event.title = req.body.title;
  event.description = req.body.description;
  event.date = req.body.date;

  res.json(event);
});

// DELETE event
router.delete("/:id", (req, res) => {
  events = events.filter(e => e._id !== req.params.id);
  res.json({ msg: "Deleted" });
});

// REGISTER event
router.post("/register/:id", (req, res) => {
  const event = events.find(e => e._id === req.params.id);
  if (!event) return res.status(404).json({ msg: "Event not found" });

  event.participants.push(req.body.user);
  res.json(event);
});

module.exports = router;