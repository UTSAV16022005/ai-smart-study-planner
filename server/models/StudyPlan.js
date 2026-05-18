import mongoose from "mongoose";

const dailySessionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    timeSlot: { type: String, enum: ["morning", "afternoon", "evening"], default: "afternoon" }
  },
  { _id: true }
);

const studyPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true, trim: true },
  goalHours: { type: Number, required: true, min: 1 },
  examDate: { type: Date, required: true },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  dailySessions: [dailySessionSchema],
  totalPlannedHours: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("StudyPlan", studyPlanSchema);
