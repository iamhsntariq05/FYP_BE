import mongoose, { Schema } from "mongoose";
import { IEvaluation } from "../types";

const submissionSchema: mongoose.Schema = new Schema({
  facultyId: {
    type: mongoose.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "StudentGroup",
    required: true,
  },
  submissionId: {
    type: String,
    required: true,
  },
  evaluationDate: {
    type: Date,
    default: Date.now(),
  },
  deliverable: {
    type: mongoose.Types.ObjectId,
    ref: "Deliverable",
  },
  rubric: [
    {
      id: { type: String },
    },
    {
      student: { type: String },
    },
    {
      score: {
        type: String,
      },
    },
  ],
  comment: {
    type: String,
    required: true,
  },
});
const Submission = mongoose.model<any>("Submission", submissionSchema);
export default Submission;
