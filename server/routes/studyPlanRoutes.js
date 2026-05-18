import express from "express";
import { createPlan, deletePlan, getPlans, updatePlan } from "../controllers/studyPlanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getPlans).post(createPlan);
router.route("/:id").put(updatePlan).delete(deletePlan);

export default router;
