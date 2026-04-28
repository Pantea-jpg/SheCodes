import { ObjectId } from "mongodb";

export interface User{
    id?:ObjectId
    username:string;
    password:string;
    role:"ADMIN"|"USER";
}