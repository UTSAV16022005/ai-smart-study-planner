import asyncHandler from "express-async-handler";
import StudyPlan from "../models/StudyPlan.js";

const startOfDay = (date) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const generateSessions = (goalHours, examDate, priority) => {
  const today = startOfDay(new Date());
  const exam = startOfDay(examDate);
  const dates = [];

  for (let day = new Date(today); day <= exam; day.setDate(day.getDate() + 1)) {
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    if (!isWeekend) dates.push(new Date(day));
  }

  const usableDates = dates.length ? dates : [today];
  const totalSessions = Math.max(1, Math.ceil(Number(goalHours) / 1.5));
  const timeSlot = Number(priority) >= 4 ? "morning" : Number(priority) >= 3 ? "afternoon" : "evening";
  const sessions = [];

  for (let index = 0; index < totalSessions; index += 1) {
    sessions.push({
      date: usableDates[index % usableDates.length],
      hours: Math.min(1.5, Math.max(0.5, Number(goalHours) - index * 1.5)),
      completed: false,
      timeSlot
    });
  }

  return sessions.sort((a, b) => a.date - b.date);
};

export const getPlans = asyncHandler(async (req, res) => {
  const plans = await StudyPlan.find({ userId: req.user._id }).sort({ examDate: 1 });
  res.json(plans);
});

export const createPlan = asyncHandler(async (req, res) => {
  const { subject, goalHours, examDate, priority } = req.body;
  const dailySessions = generateSessions(goalHours, examDate, priority);
  const totalPlannedHours = dailySessions.reduce((sum, session) => sum + session.hours, 0);
  const plan = await StudyPlan.create({
    userId: req.user._id,
    subject,
    goalHours,
    examDate,
    priority,
    dailySessions,
    totalPlannedHours
  });
  res.status(201).json(plan);
});

export const updatePlan = asyncHandler(async (req, res) => {
  const plan = await StudyPlan.findOne({ _id: req.params.id, userId: req.user._id });
  if (!plan) {
    res.status(404);
    throw new Error("Study plan not found");
  }

  if (req.body.sessionId) {
    const session = plan.dailySessions.id(req.body.sessionId);
    if (!session) {
      res.status(404);
      throw new Error("Session not found");
    }
    session.completed = req.body.completed;
  } else {
    Object.assign(plan, req.body);
  }

  await plan.save();
  res.json(plan);
});

export const deletePlan = asyncHandler(async (req, res) => {
  const plan = await StudyPlan.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!plan) {
    res.status(404);
    throw new Error("Study plan not found");
  }
  res.json({ message: "Study plan deleted" });
});
