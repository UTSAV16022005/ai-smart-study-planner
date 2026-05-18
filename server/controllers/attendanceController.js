import asyncHandler from "express-async-handler";
import Attendance from "../models/Attendance.js";

export const getAttendance = asyncHandler(async (req, res) => {
  const subjects = await Attendance.find({ userId: req.user._id });
  subjects.sort((a, b) => a.percentage - b.percentage);
  res.json(subjects);
});

export const createAttendance = asyncHandler(async (req, res) => {
  const subject = await Attendance.create({ ...req.body, userId: req.user._id });
  res.status(201).json(subject);
});

export const markAttendance = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["present", "absent"].includes(status)) {
    res.status(400);
    throw new Error("Status must be present or absent");
  }

  const subject = await Attendance.findOne({ _id: req.params.id, userId: req.user._id });
  if (!subject) {
    res.status(404);
    throw new Error("Attendance subject not found");
  }

  subject.sessions.push({ status });
  subject.totalClasses += 1;
  if (status === "present") subject.attendedClasses += 1;
  await subject.save();
  res.json(subject);
});

export const deleteAttendance = asyncHandler(async (req, res) => {
  const subject = await Attendance.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!subject) {
    res.status(404);
    throw new Error("Attendance subject not found");
  }
  res.json({ message: "Attendance subject deleted" });
});
