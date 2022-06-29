import mongoose, { Schema } from "mongoose";
import { IRubric } from "../types";

const rubricSchema: mongoose.Schema = new Schema({
  // deliverable: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Deliverable",
  // },
  rubricItem: [
    {
      title: { type: String },

      score: {
        type: String,
      },
    },
  ],
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});
const Rubric = mongoose.model<IRubric>("Rubric", rubricSchema);
export default Rubric;
