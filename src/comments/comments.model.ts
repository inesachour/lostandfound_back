import mongoose from 'mongoose';
import { UserSchema } from 'src/users/user.schema';

export const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  dateCreation: { type: String, required: true },
  dateModification : {type: Date, required : false},
  owner: UserSchema,
});

export interface Publication extends mongoose.Document {
  text: string;
  dateCreation: Date;
  dateModification: Date;
  owner: string;
}
