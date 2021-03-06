import mongoose from 'mongoose';
import { User } from 'src/users/user.interface';

export const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  tempsCreation: { type: String, required: true },
  location: {
    coordinates: { type: ['Double'], required: true },
    type: { type: 'String', required: true },
  },
  images: { type: ['Mixed'], required: true },
  owner: {
    _id: {
      type: 'String',
      required: false,
    },
    firstName: {
      type: 'String',
      required: true,
    },
    lastName: {
      type: 'String',
      required: true,
    },
    phone: {
      type: 'String',
      required: true,
    },
    email: {
      type: 'String',
      required: true,
    },
    photo: {
      type: 'String',
      required: false,
    },
  },
  category: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
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
  owner: User;
  type: string;
}
