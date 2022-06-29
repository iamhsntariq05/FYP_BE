import * as MeetingService from "../../services/meeting/meetingService";
import { createAMeeting } from "../../services/meeting/meetingService";
import { BadRequest } from "../../utils/errors";

export const getMeeting = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const meeting = await MeetingService.getMeeting(id);
    res.send({ message: `Meeting successfully fetched!`, meeting });
  } catch (ex) {
    next(ex);
  }
};
export const updateMeeting = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const meeting = await MeetingService.updateMeeting(id, obj);
    res.send({ message: `Meeting successfully updated!`, meeting });
  } catch (ex) {
    next(ex);
  }
};
export const deleteMeeting = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    await MeetingService.deleteById(id);
    res.send({ message: `Meeting deleted successfully!` });
  } catch (ex) {
    next(ex);
  }
};
export const createMeeting = async (req: any, res: any, next: any) => {
  const obj = req.body;
  try {
    if (!obj) {
      throw new BadRequest("Missing required field: obj");
    }
    
    const meeting = await createAMeeting(obj);
    
    res.send({ message: `Meeting created successfully!`, meeting });
  } catch (ex) {
    next(ex);
  }
};
export const getAllMeeting = async (req: any, res: any, next: any) => {
  try {
    const meetings = await MeetingService.getAllMeetings();
    res.send({ message: `Meeting successfully fetched!`, meetings });
  } catch (ex) {
    next(ex);
  }
};

export const verifyMeeting= async (req: any, res: any, next: any) => {
    const id = req.params.id;
    console.log('added logger', id)
    try {
      if (!id) {
        throw new BadRequest("Missing required field: id");
      }
          const meeting = await MeetingService.verifyLog(
        id
      );
      res.send({ message: `Meeting verified successfully!`, meeting });
    } catch (ex) {
      next(ex);
    }
  };