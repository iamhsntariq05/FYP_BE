import { Admin } from "../../models";
import * as adminService from "../../services/admin/adminService";
import { IAdmin } from "../../types";
import { BadRequest } from "../../utils/errors";

export const getadminprofile = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const admin: IAdmin = await adminService.getAdmin(id);
    res.send({ message: `admin successfully fetched!`, admin });
  } catch (ex) {
    next(ex);
  }
};

export const uploadAdminPhoto = async (req: any, res: any, next: any) => {
  console.log(req.user);
  console.log(req.file);
  //update on db
  const updateAdmin = await Admin.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        profile: `${process.env.ROOT_PATH}/${req.file.filename}`,
      },
    },
    { new: true }
  );
  console.log(updateAdmin);
  res.send({ updatedAdmin: updateAdmin });
};
