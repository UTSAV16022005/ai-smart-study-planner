import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["present", "absent"], required: true }
  },
  { _id: true }
);

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true, trim: true },
  totalClasses: { type: Number, default: 0 },
  attendedClasses: { type: Number, default: 0 },
  sessions: [attendanceSessionSchema]
});

attendanceSchema.virtual("percentage").get(function () {
  if (!this.totalClasses) return 0;
  return Math.round((this.attendedClasses / this.totalClasses) * 100);
});

attendanceSchema.set("toJSON", { virtuals: true });
attendanceSchema.set("toObject", { virtuals: true });

export default mongoose.model("Attendance", attendanceSchema);
