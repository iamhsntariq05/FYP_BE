import mongoose, { Schema } from "mongoose";
import { IDeliverable } from "../types";
const studentSchema: mongoose.Schema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    filePath: {
      type: String,
    },
    obtainedRubrics: {
      type: Array,
    },
  },
  { timestamps: true }
);

const deliverableSchema: mongoose.Schema = new Schema({
  batchId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  outcome: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  },
  totalRubrics: {
    type: Array,
    required: true,
  },
  completedAssignments: {
    type: [studentSchema],
    required: false,
  // templateId: {
  //   type: String,
  //   required: true,
  },
  deliverableType: {
    type: String,
  },
  result: {
    type: String,
  },
  comments: {
    type: String,
    default: "",
    required: false,
  },
  faculty_id: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
  },
  markedObtains: {
    type: Boolean,
    default: false,
    required: false,
  recommendation: {
    type: String,
  },

  rubric: {
    type: mongoose.Types.ObjectId,
    ref: "Rubric",
    }  },
});

const Deliverable = mongoose.model<IDeliverable>(
  "Deliverable",
  deliverableSchema
);
export default Deliverable;
