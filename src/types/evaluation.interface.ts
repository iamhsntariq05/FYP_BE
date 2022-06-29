import { Document } from "mongoose";

export interface IEvaluation extends Document{
    facultyId:string;
    submissionId:string;
    evaluationDate:Date;
    recommendation:string;
}

export interface IEvaluatorTeam extends Document {
  name: string;
  faculty: [];
  group: [];
}
