import mongoose from "mongoose";


const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    // enum: ["Easy", "Medium", "Hard"],
    // default: "Easy",
  },

  timeLimit: {
    type: Number, // seconds

  },

  answer: {
    type: String,

  },

  feedback: {
    type: String,

  },

  score: {
    type: Number,
    default: 0,

  },

  confidence: {
    type: Number,
    default: 0,

  },

  communication: {
    type: Number,
    default: 0,

  },

  correctness: {
    type: Number,
    default: 0,
  
  },
});

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "",
    },

    mode: {
      type: String,
      enum: ["technical", "hr", "mixed"],
      default: "technical",
    },
    resumeText:{
        type:String
    },
    questions: [
        questionsSchema
    ],
    finalScore:{type:Number,default:0},
    status:{
        type:String,
        enum:["Incompleted","Completed"],
        default:"Incompleted"
    }
  },
  {
    timestamps: true,
  },
);

// const Interview = mongoose.model("Interview",interviewSchema)

// export default Interview

const Interview =
  mongoose.models.Interview || mongoose.model("Interview", interviewSchema);

export default Interview;
