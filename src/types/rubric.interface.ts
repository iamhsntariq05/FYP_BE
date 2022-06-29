import { Document } from "mongoose";

export interface IRubric extends Document{
    deliverable:string;
    rubricItem:[IRubricItem]
    creationDate:Date;
}
export interface IRubricItem extends Document{
    title:string;
    score:number;
}