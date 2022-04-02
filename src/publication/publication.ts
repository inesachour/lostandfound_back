import * as mongoose from 'mongoose';

export const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true }, //String is a JS type
  description: { type: String, required: true },
  category: { type: String, required: true },
});

export interface Publication {
  id: string; //string is a TS type
  title: string;
  description: string;
  category: string;
}
