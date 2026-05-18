import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  dueDate: { type: Date, required: true },
  subject: { type: String, required: true, trim: true },
  reminder: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
