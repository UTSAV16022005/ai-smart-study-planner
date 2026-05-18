import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";

export const getNotes = asyncHandler(async (req, res) => {
  const { search, subject } = req.query;
  const filter = { userId: req.user._id };
  if (subject) filter.subject = subject;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } }
    ];
  }
  const notes = await Note.find(filter).sort({ isPinned: -1, updatedAt: -1 });
  res.json(notes);
});

export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.json(note);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.json({ message: "Note deleted" });
});
