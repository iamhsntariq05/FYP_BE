import mongoose, { Schema } from "mongoose";
import { IEvaluatorTeam } from "../types";

const evaluatorTeamSchema: mongoose.Schema = new Schema({
  name: {
    type: String,
  },
  faculty: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Faculty",
    },
  ],
  group: [
    {
      type: mongoose.Types.ObjectId,
      ref: "StudentGroup",
    },
  ],
});
const EvaluatorTeam = mongoose.model<IEvaluatorTeam>(
  "EvaluatorTeam",
  evaluatorTeamSchema
);
export default EvaluatorTeam;
