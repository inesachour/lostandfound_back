import * as mongoose from 'mongoose';

export interface User extends  mongoose.Document{
    firstName:string,
    lastName : string,
    phone : string,
    photo: string,
    email: string,
    password:string,
    role : string,
}
