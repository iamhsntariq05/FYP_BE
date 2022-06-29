import { BadRequest } from "../../utils/errors";
import * as schedulerService from "../../services/automatedScheduler/schedulerService";

export const addTimeSlots = async (req: any, res: any, next: any) => {
  const timeslots = req.body.slots;
  const id = req.params.id;
  try {
    const slots = await schedulerService.addFacultyTimeSlots(id, timeslots);
    res.send({ message: `Time slots added successfully !`, slots });
  } catch (ex) {
    // console.log(ex);
    next(ex);
  }
};

export const createEvaluatorTeams = async (req: any, res: any, next: any) => {
  const teams = req.body.teams;
  try {
    await schedulerService.createTeams(teams);
    res.send({ message: `Teams Created !` });
  } catch (ex) {
    // console.log(ex);
    next(ex);
  }
};
export const getEvaluatorTeams = async (req: any, res: any, next: any) => {
  try {
    const teams = await schedulerService.getTeams();
    res.send({ message: `Teams Fetched !`, teams });
  } catch (ex) {
    // console.log(ex);
    next(ex);
  }
};
export const assignGroupsToTeams = async (req: any, res: any, next: any) => {
  try {
    const { startDate, timeSlot } = req.body;
    await schedulerService.assignGroups(startDate, timeSlot);
    res.send({ message: `Groups Assigned !` });
  } catch (ex) {
    // console.log(ex);
    next(ex);
  }
};
