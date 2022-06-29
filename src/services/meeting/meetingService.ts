import Meeting from "../../models/Meeting";
import { IMeeting } from "../../types";
import { NotFound } from "../../utils/errors";

export const IsMeetingExist = async (id: string) => {
  const meeting: IMeeting | null = await Meeting.findById(
    id
  ).exec();
  return !!meeting;
};

export const getMeeting = async (id: string) => {
  const meeting: IMeeting | null = await Meeting.findById(id)
    .populate("rubric")
    .exec();
  if (!meeting) {
    throw new NotFound(`Meeting with id ${id} not found!`);
  }
  return meeting;
};

export const getAllMeetings = async () => {
  const meetings: IMeeting[] | null = await Meeting.find({})
    .populate("studentId")
    .exec();
  if (!meetings) {
    throw new NotFound(`No Meetings found!`);
  }
  return meetings;
};

export const updateMeeting = async (id: string, obj: any) => {
  const meeting: IMeeting | null = await Meeting.findByIdAndUpdate(
    id,
    obj
  ).exec();
  if (!meeting) {
    throw new NotFound(`Meeting with id ${id} not found!`);
  }
  return meeting;
};
export const deleteById = async (id: string) => {
  const meeting: IMeeting | null = await Meeting.findByIdAndDelete(
    id
  ).exec();
  if (!meeting) {
    throw new NotFound(`Meeting with id ${id} not found!`);
  }
};

export const createAMeeting = async (obj: any) => {
  const meeting: IMeeting | null = await Meeting.create(obj);
  if (!meeting) {
    throw new NotFound(`Meeting not created!`);
  }
  return meeting;
};

export const verifyLog = async (id:any) => {
console.log("the id", id); 
const meeting : IMeeting | null = await Meeting.findByIdAndUpdate(id, {verify:true}, {new:true,upsert:true}).exec();
console.log(meeting);

return meeting;
}
