import mongoose, { Schema } from "mongoose";
import { IMeeting } from "../types";

const meetingSchema: mongoose.Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  studentId:{
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  addDate: {
    type: Date,
    default: Date.now(),
  },
  meetingDate: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    //required: true,
  },
  verify: {
    type:Boolean,
    default:false,
  },
  recordedTime:{
    type: Number,
    required: true,
  }, 
  message:{
    type : String,
    required: true,
  }


});
const Meeting = mongoose.model<IMeeting>("Meeting", meetingSchema);
export default Meeting;
