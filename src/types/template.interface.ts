import { Document } from "mongoose";

export interface ITemplate extends Document{
    deliverable:string,
    file:string;
    title:string; 
}