import { Student } from "../../models";
import * as studentAuthService from "../../services/auth/studentAuthService";
import { generateAccessToken } from "../../token";
import { IBatch, IStudent } from "../../types";
import { BadRequest, NotFound } from "../../utils/errors";
import csv from "csvtojson";
import Batch from "../../models/Batch";

export const registerStudentBatch = async (req: any, res: any, next: any) => {
  const data = await csv().fromString(req.file.buffer.toString());
  if (data.length === 0 || req.body.batch) return;
    // res.send({ message: "Fields not found" });
  try {
    let student;
    // add batch
    const batchObj = {
      calenderId: req.body.batch,
    };
    const batch: IBatch = await Batch.create(batchObj);
    data.map(async (std: IStudent) => {
      // register student
      student = await studentAuthService.signUp(std.password,{
        ...std,
        batch: batch._id,
      });
      // send email to user with credentials
    });
    res.send({
      message: `All Students are registered!`,
    });
  } catch (err) {
    next(err);
  }
};

export const registerStudent = async (req: any, res: any, next: any) => {
  const studentObj: IStudent = req.body;
  try {
    if (!studentObj.email || !studentObj.password) {
      throw new NotFound("Student Credentials are not found!");
    }
    const student = await studentAuthService.signUp(
      studentObj.password,
      studentObj
    );
    res.send({
      message: `Student registered!`,
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const loginStudent = async (req: any, res: any, next: any) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      throw new BadRequest("Missing required field: Email and Password");
    }
    const { token, student } = await studentAuthService.login(email, password);
    res.send({ message: `Student Logged in!`, token, student });
  } catch (ex) {
    next(ex);
  }
};
