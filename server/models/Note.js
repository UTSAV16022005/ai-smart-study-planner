import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    isPinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
