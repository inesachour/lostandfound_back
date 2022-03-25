/*export const QuoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  person: { type: String, required: true },
  category: {
    type: String,
    //enum: Object.values(QuoteCategoryEnum),
    required: true,
  },
});*/

export interface Quote {
  //extends mongoose.Document {
  title: string;
  description: string;
  dateCreation: Date;
  date: Date;
  location: string;
  photos: [];
  user: string;
}
