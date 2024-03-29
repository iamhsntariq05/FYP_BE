import mongoose, { Schema } from "mongoose";
import { IDeliverable } from "../types";

const FacultyStudentRelationshipSchema: mongoose.Schema = new Schema(
  {
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    // group: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "StudentGroup",
    // },

  },
  { timestamps: true }
);
const FacultyStudentRelationship = mongoose.model<IDeliverable>(
  "FacultyStudentRelationship",
  FacultyStudentRelationshipSchema
);
export default FacultyStudentRelationship;
