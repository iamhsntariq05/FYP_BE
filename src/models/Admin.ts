import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../types";

const adminSchema: mongoose.Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  salt: { 
    type: String, 
    required: true 
},
profile: {
  type: String,
  default: "",
},
});
const Admin = mongoose.model<IAdmin>(
  "Admin",
  adminSchema
);
export default Admin;
