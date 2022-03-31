import mongoose from 'mongoose';

export const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  dateCreation: { type: String, required: true },
  location: { type: String, required: false },
  images: { type: String, required: false },
  user: { type: String, required: true },
});

export interface Publication extends mongoose.Document {
  title: string;
  description: string;
  dateCreation: Date;
  date: Date;
  location: string;
  images: [];
  user: string;
}
