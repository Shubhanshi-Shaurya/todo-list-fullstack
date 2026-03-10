const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

// GET all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// ADD new task
router.post("/", async (req, res) => {
    const task = new Task({
        text: req.body.text
    });

    const savedTask = await task.save();
    res.json(savedTask);
});

// DELETE task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;