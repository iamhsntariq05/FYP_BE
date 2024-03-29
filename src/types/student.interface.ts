import { Document } from "mongoose";

export interface IStudent extends Document {
  regNo: string;
  firstName: string;
  lastName: string;
  email: string;
  leader: boolean;
  contact: string;
  userId: string;
  batch: string;
  group: string;
  grade: [];
  image: string;
  github: string;
  password: string;
  requestSent:[];
}
