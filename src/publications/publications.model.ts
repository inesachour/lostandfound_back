import mongoose from 'mongoose';

export const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  tempsCreation: { type: String, required: true },
  location: { type: String, required: false },
  images: { type: String, required: false },
  owner: { type: String, required: true },
});

export interface Publication extends mongoose.Document {
  title: string;
  description: string;
  tempsCreation: Date;
  date: Date;
  location: string;
  images: [];
  category: string;
  status: string;
  owner: string;
}
