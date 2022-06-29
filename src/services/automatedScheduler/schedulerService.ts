// import { Admin } from "../../models";
import { Faculty, StudentGroup } from "../../models";
import Admin from "../../models/Admin";
import EvaluatorTeam from "../../models/EvaluatorTeam";
import { IAdmin } from "../../types";
import { NotFound } from "../../utils/errors";
import shuffleData from "../../utils/randomize";

export const addFacultyTimeSlots = async (id: string, timeslots: any) => {
  // check if slot is already added
  const faculty = await Faculty.findByIdAndUpdate(
    id,
    {
      slots: timeslots,
    },
    { new: true, upsert: true }
  ).exec();
  return faculty;
};
export const createTeams = async (teams: any) => {
  // TODO: check if slot is already added

  const countTeams = await EvaluatorTeam.find({}).exec();
  let index = countTeams.length;
  let ids: any = [];
  teams.forEach(async (item: any, i: any) => {
    const team = item.team;
    const facultyIds = team.map((tm: any) => {
      ids.push(tm.id);
      return tm.id;
    });
    const obj = {
      name: `Team ${index + 1}`,
      faculty: facultyIds,
    };
    index = index + 1;
    const evalTeam = new EvaluatorTeam(obj);
    await evalTeam.save();
  });
  // change faculty role
  ids.forEach(async (id: any) => {
    await Faculty.findByIdAndUpdate(
      id,
      {
        role: "evaluator",
      },
      { new: true, upsert: true }
    ).exec();
  });
  return;
};

export const getTeams = async () => {
  const teams = await EvaluatorTeam.find({})
    .populate("faculty")
    .populate("group")
    .exec();
  if (!teams) throw new NotFound("Teams not found!");
  return teams;
};
export const assignGroups = async (startDate: any, timeSlot: any) => {
  const teams = await EvaluatorTeam.find({})
    .populate("faculty")
    .populate("group")
    .exec();
  if (!teams) throw new NotFound("Teams not found!");

  const groups = await StudentGroup.find({}).exec();
  if (!groups) throw new NotFound("Groups not found!");

  // randomize array
  const randomizeGroups = shuffleData(groups);

  // assign groups
  const perTeam: any = groups.length / teams.length;

  // assign perTeam groups to per team
  var index = 1;
  var index2 = 0;
  const tm = Math.round(perTeam);
  await randomizeGroups.map(async (grp: any) => {
    if (index > tm) {
      index = 1;
      index2 = index2 + 1;
    }
    const team = teams[index2];
    index = index + 1;
    await EvaluatorTeam.findByIdAndUpdate(
      team._id,
      {
        $push: { group: grp._id },
      },
      { new: true, upsert: true }
    ).exec();
  });

  // assign slots in specific time
  const allTeams = await EvaluatorTeam.find({})
    .populate("faculty")
    .populate("group")
    .exec();

  await allTeams.map(async (team: any) => {
    if (!team.faculty) return;

    // find common slots for each team
    let slotsArr: any = [];

    // add all slots
    team.faculty.forEach((fac: any) => {
      if (fac?.slots?.length) {
        slotsArr.push(fac.slots);
      }
    });

    if (slotsArr?.length <= 0) throw new NotFound("No Common Slots found!");

    // find common slots
    let firstArray = slotsArr.shift();
    const result = firstArray.reduce((common: any, item: any) => {
      if (
        slotsArr.every((inner: any[]) =>
          inner.some((_item) => _item.StartTime === item.StartTime)
        )
      ) {
        common.push(item);
      }
      return common;
    }, []);
    // result=>
    // [
    //   {
    //     Subject: 'free',
    //     Id: 5,
    //     StartTime: '2018-02-13T17:30:00.000Z',
    //     EndTime: '2018-02-13T18:00:00.000Z',
    //     IsAllDay: false
    //   },
    //   {
    //     Subject: 'free',
    //     Id: 7,
    //     StartTime: '2018-02-15T16:30:00.000Z',
    //     EndTime: '2018-02-15T17:00:00.000Z',
    //     IsAllDay: false
    //   }
    // ]
  });

  return teams;
};
