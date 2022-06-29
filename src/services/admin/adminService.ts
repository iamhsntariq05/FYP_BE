// import { Admin } from "../../models";
import Admin from "../../models/Admin";
import { IAdmin } from "../../types";
import { NotFound } from "../../utils/errors";

export const IsAdminExist = async (id: string) => {
  const admin: IAdmin | null = await Admin.findById(id).exec();
  return !!admin;
};
export const getAdmin = async (id: string) => {
  const admin: IAdmin | null = await Admin.findById(id).exec();
  if (!admin) {
    throw new NotFound(`admin with id ${id} not found!`);
  }
  return admin;
};