import mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  dateCreation: { type: String, required: true },
  dateModification : {type: Date, required : false},
  commentOwner: {type : String, required: true},
  publication : {type : String, required: true}
});

export interface Publication extends mongoose.Document {
  text: string;
  dateCreation: Date;
  dateModification: Date;
  commentOwner: string;
  publication: string;
}
