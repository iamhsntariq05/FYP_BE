import mongoose, { Schema } from "mongoose";
import { IStudent } from "../types";

const studentSchema: mongoose.Schema = new Schema({
  regNo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  leader: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Number,
  },
  batch: {
    type: String,
    ref: "Batch",
  },
  group: {
    type: mongoose.Types.ObjectId,
    ref: "StudentGroup",
  },
  grade: [
    {
      fyp1: {
        type: Number,
        default: 0,
      },
    },
    {
      fyp2: {
        type: Number,
        default: 0,
      },
    },
  ],
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  requestSent: [{ type: mongoose.Types.ObjectId, ref: "StudentGroup" }],
  password: {
    type: String,
    required: true,
  },
  salt: { type: String, required: true },
  profile: {
    type: String,
    default: "",
  },
});
const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;