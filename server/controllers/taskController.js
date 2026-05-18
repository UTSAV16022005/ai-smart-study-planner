import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";

export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority } = req.query;
  const filter = { userId: req.user._id };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user._id });
  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json({ message: "Task deleted" });
});
