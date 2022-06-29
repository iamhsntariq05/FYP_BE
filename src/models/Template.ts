import mongoose, { Schema } from "mongoose";
import {  ITemplate } from "../types";

const templateSchema: mongoose.Schema = new Schema({
  deliverable: {
    type: mongoose.Types.ObjectId,
    ref: "Deliverable",
  },
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});
const Template = mongoose.model<ITemplate>(
  "Template",
  templateSchema
);
export default Template;
