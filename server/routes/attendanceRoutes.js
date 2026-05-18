import express from "express";
import {
  createAttendance,
  deleteAttendance,
  getAttendance,
  markAttendance
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getAttendance).post(createAttendance);
router.put("/:id/mark", markAttendance);
router.delete("/:id", deleteAttendance);

export default router;
