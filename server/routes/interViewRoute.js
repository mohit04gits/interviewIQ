import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { analyzeResume, finishInterview, generateQuestion, getInterviewHistory, submitAnswer } from "../controllers/interviewController.js";

const interviewRouter = express.Router();
//TWO MIDDLEWARE USED
interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);
interviewRouter.post("/generate-questions",isAuth, generateQuestion)

interviewRouter.post("/submit-answer",isAuth, submitAnswer)
// interviewRouter.post("/finish",isAuth,finishInterview)

interviewRouter.post("/finish-interview", isAuth, finishInterview)

interviewRouter.get("/history", isAuth, getInterviewHistory);  //CLAUDE WALA CODE

export default interviewRouter;
