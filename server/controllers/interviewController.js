// import fs from "fs";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
// import { askAi } from "../services/geminiAi.js";
// import User from "../models/userModel.js";
// import { json } from "stream/consumers";
// import Interview from "../models/interViewModel.js";

// export const analyzeResume = async (req, res) => {
//   try {
//     // Check if resume is uploaded
//     if (!req.file) {
//       return res.status(400).json({
//         message: "Resume required",
//       });
//     }

//     // Read uploaded PDF
//     const filePath = req.file.path;
//     const fileBuffer = await fs.promises.readFile(filePath);
//     const uint8Array = new Uint8Array(fileBuffer);

//     // Load PDF
//     const pdf = await pdfjsLib.getDocument({
//       data: uint8Array,
//     }).promise;

//     // Extract text from all pages
//     let resumeText = "";

//     for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//       const page = await pdf.getPage(pageNum);

//       const textContent = await page.getTextContent();

//       const pageText = textContent.items.map((item) => item.str).join(" ");

//       resumeText += pageText + "\n";
//     }

//     resumeText = resumeText.trim();

//     // AI Prompt
//     const messages = [
//       {
//         role: "system",
//         content: `
// You are an AI Resume Parser.

// Extract structured data from the resume.

// Return ONLY valid JSON in this format:

// {
//   "role": "string",
//   "experience": "string",
//   "projects": ["project1", "project2"],
//   "skills": ["skill1", "skill2"]
// }

// Rules:
// - Return only JSON.
// - No explanation.
// - No markdown.
// - No \`\`\`json.
//         `,
//       },
//       {
//         role: "user",
//         content: resumeText,
//       },
//     ];

//     // Gemini Response
//     const aiResponse = await askAi(messages);

//     // Clean Gemini response
//     const cleanResponse = aiResponse
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     const parsed = JSON.parse(cleanResponse);

//     // Delete uploaded file
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }

//     // Response
//     res.status(200).json({
//       role: parsed.role,
//       experience: parsed.experience,
//       projects: parsed.projects,
//       skills: parsed.skills,
//       resumeText,
//     });
//   } catch (error) {
//     console.error(error);

//     // Delete uploaded file if an error occurs
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const generateQuestion = async (req, res) => {
//   try {
//     let { role, experience, mode, resumeText, projects, skills } = req.body;

//     role = role?.trim();
//     experience = experience?.trim();
//     mode = mode?.trim();

//     if (!role || !experience || !mode) {
//       return res
//         .status(400)
//         .json({ message: "Role, Experience and Mode are required" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     if (user.credits < 50) {
//       return res.status(400).json({
//         message: "Not enough credits. Minimum %0 credits required.",
//       });
//     }

//     const projectText =
//       Array.isArray(projects) && projects.length ? projects.join("") : "None";

//     const skillsText =
//       Array.isArray(skills) && skills.length ? skills.join("") : "None";

//     const safeResume = resumeText?.trim() || "None";

//     const userPrompt = `
//     Role:${role}
//     Experience:${experience}
//     InterviewMode:${mode}
//     Projects:${projectText}
//     Skills:${skillsText}
//     Resume:${safeResume}
//     `;
//     if (!userPrompt.trim()) {
//       return res.statsus(400).json({
//         message: "Prompt content is ready",
//       });
//     }

//     const message = [
//       {
//         role: "system",
//         content: `
//             you are a real human interviewerconsuting a professionsal interview.

//             Speak in simple,natural English as if you are directluy talking to the candidate.

//             Generate exactly 5 interview questions.

//             Strict Rules:
//             -Each question must contains 15v to 25 words.
//             -Each question must be a single complete sentence.
//             -Do not number them.
//             -Do not add explainations
//             -Do not add extra text before or after.
//             -one question per line only.
//             -Keep language simple and conversational.
//             -Questions must feel practical and realistic.

//             Difficulty Progression:
//             Question 1->easy
//             Question 2->easy
//             Question 3->medium
//             Question 4->medium
//             Question 5->hard

//             Make questions based on the candidate's role,experience,projects,InterviewMode,skills and resume details
//             `,
//       },
//       {
//         role: "user",
//         content: userPrompt,
//       },
//     ];

//     const aiResponse = await askAi(messages);

//     if (!aiResponse) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to generate interview questions.",
//       });
//     }

//     const questions = aiResponse
//       .split("\n")
//       .map((q) => q.trim())
//       .filter((q) => q.length > 0);

//     if (questions.length !== 5) {
//       return res.status(500).json({
//         success: false,
//         message: "AI returned an invalid number of questions.",
//       });
//     }

//     user.credits -= 50;
//     await user.save();

//     const interview = await Interview.create({
//       userId: user._id,
//       role,
//       experience,
//       mode,
//       resumeText: safeResume,
//       questions: questions.map((q, index) => ({
//         question: q,
//         difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
//         timeLimit: [60, 60, 90, 90, 120][index],
//       })),
//     });

//     return res.status(200).json({
//       success: true,
//       userName: user.name,
//       creditsLeft: user.credits,
//       questions: interview.questions,
//     });
//   } catch (error) {
//     console.error("Generate Question Error:", error);

//     return res.status(500).json({
//       message: `failed to create an interview ${error}`,
//     });
//   }
// };

// export const submitAnswer = async (req, res) => {
//   try {
//     const { interviewId, questionIndex, answer, timeTaken } = req.body;

//     if (
//       interviewId === undefined ||
//       questionIndex === undefined ||
//       questionIndex === null
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Interview ID and Question Index are required.",
//       });
//     }

//     const interview = await Interview.findById(interviewId);

//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         message: "Interview not found.",
//       });
//     }

//     // Check ownership
//     if (interview.userId.toString() !== req.userId) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized access.",
//       });
//     }

//     const question = interview.questions[questionIndex];

//     if (!question) {
//       return res.status(404).json({
//         success: false,
//         message: "Question not found.",
//       });
//     }

//     // Empty Answer
//     if (!answer || !answer.trim()) {
//       question.answer = "";
//       question.feedback = "You did not submit an answer.";
//       question.score = 0;
//       // question.communication = 0;
//       // question.correctness = 0;
//       // question.confidence = 0;
//       // question.timeTaken = timeTaken || 0;
//       // question.isAnswered = true;

//       await interview.save();

//       return res.status(200).json({
//         success: true,
//         feedback: question.feedback,
//       });
//     }

//     // question.answer = answer.trim();
//     // question.timeTaken = timeTaken || 0;
//     // question.isAnswered = true;

//     if (timeTaken > question.timeLimit) {
//       ((question.score = 0),
//         (question.feedback = "Time limit exceeded. Answer bot evaluated"));
//       question.answer = answer;

//       await interview.save();
//     }
//     return res.json({
//       feedback: question.feedback,
//     });

//     const messages = [
//       {
//         role: "system",
//         content: `
// You are a professional human interviewer evaluating a candidate's answer in a real interview.

// Evaluate naturally and fairly, like a real person would.

// Score the answer in these areas (0 to 10):

// 1. Confidence - Does the answer sound clear, confident, and well-presented?
// 2. Communication - Is the language simple, clear, and easy to understand?
// 3. Correctness - Is the answer accurate, relevant, and complete?

// Rules:
// - Be realistic and unbiased.
// - Do not give random high scores.
// - If the answer is weak, score low.
// - If the answer is strong and detailed, score high.
// - Consider clarity, structure, and relevance.

// Calculate:
// finalScore = average of confidence, communication and correctness(rounded ro nearest whole number).

// Feedback Rules:

// - Write natural human feedback.
// - 10 to 15 words only.
// - Sound like real interview feedback.
// - Can suggest improvement if needed.
// - Do NOT repeat the question.
// - Do NOT explain scoring.
// - Keep the tone professional and honest.

// Return ONLY valid JSON in this format:

// {
//   "confidence": number,
//   "communication": number,
//   "correctness": number,
//   "finalScore": number,
//   "feedback": "short human feedback"
// }

// Do not return markdown.
// Do not wrap the response in \`\`\`.
// Do not add any extra text.
// `,
//       },
//       {
//         role: "user",
//         content: `
// Question:
// ${question.question}

// Answer:
// ${answer}
// `,
//       },
//     ];

//     const aiResponse = await askAi(messages);

//     const cleanResponse = aiResponse
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     const parsed = JSON.parse(aiResponse);

//     question.answer = answer;
//     question.feedback = evaluation.feedback || "";

//     question.score = Number(evaluation.score) || 0;

//     question.communication = Number(evaluation.communication) || 0;

//     question.correctness = Number(evaluation.correctness) || 0;

//     question.confidence = Number(evaluation.confidence) || 0;

//     await interview.save();

//     return res.status(200).json({
//       feedback: parsed.feedback,
//     });
//   } catch (error) {
//     console.error("Submit Answer Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to submit answer ${error}",
//     });
//   }
// };

// export const finishInterview = async (req, res) => {
//   try {
//     const { interviewId } = req.body;
//     const interview = await Interview.findById(interviewId);

//     if (!interviewId) {
//       return res.status(404).json({ message: "Failed to find Interview" }); //frontend error
//     }

//     const totalQuestions = interview.questions.length;

//     let totalScore = 0;
//     let totalConfidence = 0;
//     let totalCommunication = 0;
//     let totalCorrectness = 0;

//     interview.questions.forEach((q) => {
//       totalScore += q.score || 0;
//       totalConfidence += q.confidence || 0;
//       totalCommunication += q.communication || 0;
//       totalCorrectness += q.correctness || 0;
//     });

//     const finalScore =
//       totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;

//     const averageConfidence =
//       totalQuestions > 0 ? Math.round(totalConfidence / totalQuestions) : 0;

//     const averageCommunication =
//       totalQuestions > 0 ? Math.round(totalCommunication / totalQuestions) : 0;

//     const averageCorrectness =
//       totalQuestions > 0 ? Math.round(totalCorrectness / totalQuestions) : 0;

//     interview.finalScore = finalScore;
//     interview.status = "Completed";

//     await interview.save();
//     return res.status(200).json({
//       finalScore: Number(finalScore.toFixed(1)),
//       confidence: Number(avgConfidence.toFixed(1)),
//       communication: Number(avgCommunication.toFixed(1)),
//       correctness: Number(avgCorrectness.toFixed(1)),

//       questionWiseScore: interview.questions.map((q) => ({
//         question: q.question,
//         score: q.score || 0,
//         feedback: q.feedback || "",
//         confidence: q.confidence || 0,
//         communication: q.communication || 0,
//         correctness: q.correctness || 0,
//       })),
//     });
//   } catch (error) {
//     res.status(500).json({message:`Failed to finish Interview ${error}`})
//   }
// };

import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/geminiAi.js";
import User from "../models/userModel.js";
import Interview from "../models/interViewModel.js";

// ---------------------- ANALYZE RESUME ----------------------
// Keep your analyzeResume() exactly as it is.
// It is already fine.

export const analyzeResume = async (req, res) => {
  try {
    // Check if resume is uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Resume required",
      });
    }
    

// .........................................

// Read uploaded PDF
const filePath = req.file.path;

console.log("========== UPLOAD DEBUG ==========");
console.log("req.file =", req.file);
console.log("filePath =", filePath);
console.log("cwd =", process.cwd());
console.log("exists =", fs.existsSync(filePath));
console.log("==================================");

const fileBuffer = await fs.promises.readFile(filePath);


// .........................................





    // Read uploaded PDF
    // const filePath = req.file.path;
    // const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    // Load PDF
    const pdf = await pdfjsLib.getDocument({
      data: uint8Array,
    }).promise;

    // Extract text from all pages
    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item) => item.str).join(" ");

      resumeText += pageText + "\n";
    }

    resumeText = resumeText.trim();

    // AI Prompt
    const messages = [
      {
        role: "system",
        content: `
You are an AI Resume Parser.

Extract structured data from the resume.

Return ONLY valid JSON in this format:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}

Rules:
- Return only JSON.
- No explanation.
- No markdown.
- No \`\`\`json.
        `,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    // Gemini Response
    const aiResponse = await askAi(messages);

    // Clean Gemini response
    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanResponse);

    // Delete uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Response
    res.status(200).json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    console.error(error);

    // Delete uploaded file if an error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------------- GENERATE QUESTIONS ----------------------

export const generateQuestion = async (req, res) => {
  try {
    let {
      role,
      experience,
      mode,
      resumeText,
      projects = [],
      skills = [],
    } = req.body;

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res.status(400).json({
        success: false,
        message: "Role, Experience and Mode are required.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        success: false,
        message: "Minimum 50 credits required.",
      });
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
Role: ${role}

Experience: ${experience}

Interview Mode: ${mode}

Projects:
${projectText}

Skills:
${skillsText}

Resume:
${safeResume}
`;

    const messages = [
      {
        role: "system",
        content: `
You are a professional interviewer.

Generate exactly FIVE interview questions.

Rules:

- One question per line.
- No numbering.
- No bullets.
- No explanations.
- No markdown.
- No extra text.
- Every question must contain 15-25 words.
- Natural conversational English.

Difficulty:

Question 1 -> Easy
Question 2 -> Easy
Question 3 -> Medium
Question 4 -> Medium
Question 5 -> Hard

Generate questions according to the candidate's:

Role
Experience
Projects
Skills
Resume
Interview Mode
`,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAi(messages);

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate questions.",
      });
    }

    const questions = aiResponse
      .split("\n")
      .map((q) => q.trim())
      .filter(Boolean);

    if (questions.length !== 5) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid questions.",
      });
    }

    const interview = await Interview.create({
      userId: user._id,

      role,

      experience,

      mode,

      resumeText: safeResume,

      questions: questions.map((q, index) => ({
        question: q,

        difficulty: ["Easy", "Easy", "Medium", "Medium", "Hard"][index],

        timeLimit: [60, 60, 90, 90, 120][index],

        answer: "",

        feedback: "",

        score: 0,

        confidence: 0,

        communication: 0,

        correctness: 0,

        timeTaken: 0,

        isAnswered: false,
      })),
    });

    user.credits -= 50;
    await user.save();

    return res.status(201).json({
      success: true,
      interviewId: interview._id,
      userName: user.name,
      creditsLeft: user.credits,
      questions: interview.questions,
    });
  } catch (error) {
    console.error("Generate Question Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------------- SUBMIT ANSWER ----------------------

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;

    if (!interviewId || questionIndex === undefined) {
      return res.status(400).json({
        success: false,
        message: "Interview ID and Question Index are required.",
      });
    }

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    if (interview.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const question = interview.questions[questionIndex];

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    // Empty Answer
    if (!answer || !answer.trim()) {
      question.answer = "";
      question.feedback = "You did not submit an answer.";
      question.score = 0;
      question.communication = 0;
      question.correctness = 0;
      question.confidence = 0;
      question.timeTaken = timeTaken || 0;
      question.isAnswered = true;

      await interview.save();

      return res.status(200).json({
        success: true,
        feedback: question.feedback,
      });
    }

    // Time Limit Exceeded
    if (timeTaken > question.timeLimit) {
      question.answer = answer;
      question.score = 0;
      question.communication = 0;
      question.correctness = 0;
      question.confidence = 0;
      question.feedback = "Time limit exceeded.";
      question.timeTaken = timeTaken;
      question.isAnswered = true;

      await interview.save();

      return res.status(200).json({
        success: true,
        feedback: question.feedback,
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are a professional interviewer.

Evaluate the candidate's answer.

Return ONLY valid JSON.

{
  "confidence":0,
  "communication":0,
  "correctness":0,
  "finalScore":0,
  "feedback":""
}

Rules:

- Scores should be between 0 and 10.
- finalScore = average of confidence, communication and correctness.
- Feedback should be 10-15 words.
- No markdown.
- No explanation.
`,
      },
      {
        role: "user",
        content: `
Question:
${question.question}

Answer:
${answer}
`,
      },
    ];

    const aiResponse = await askAi(messages);

    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanResponse);

    question.answer = answer;
    question.feedback = parsed.feedback;
    question.score = parsed.finalScore;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.confidence = parsed.confidence;
    question.timeTaken = timeTaken || 0;
    question.isAnswered = true;

    await interview.save();

    return res.status(200).json({
      success: true,
      feedback: question.feedback,
      score: question.score,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------------- FINISH INTERVIEW ----------------------

export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;

    if (!interviewId) {
      return res.status(400).json({
        message: "Interview ID is required",
      });
    }

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions > 0 ? totalScore / totalQuestions : 0;

    const averageConfidence =
      totalQuestions > 0 ? totalConfidence / totalQuestions : 0;

    const averageCommunication =
      totalQuestions > 0 ? totalCommunication / totalQuestions : 0;

    const averageCorrectness =
      totalQuestions > 0 ? totalCorrectness / totalQuestions : 0;

    interview.finalScore = Number(finalScore.toFixed(1));
    interview.status = "Completed";

    await interview.save();

    return res.status(200).json({
      success: true,

      finalScore: Number(finalScore.toFixed(1)),
      confidence: Number(averageConfidence.toFixed(1)),
      communication: Number(averageCommunication.toFixed(1)),
      correctness: Number(averageCorrectness.toFixed(1)),

      questionWiseScore: interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || "",
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    });
  } catch (error) {
    console.error("Finish Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ─── GET INTERVIEW HISTORY ───
export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.userId })
      .sort({ createdAt: -1 }) // Latest pehle
      .select("role experience mode finalScore status createdAt questions");

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};