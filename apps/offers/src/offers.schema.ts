import * as mongoose from 'mongoose';

export const OffersSchema = new mongoose.Schema({
  price: Number,
  discount: Number,
  start_date: Date,
  end_date: Date,
  picks_id: String,
});

export interface Offers extends mongoose.Document {
  price: number;
  discount: number;
  start_date: string;
  end_date: string;
  picks_id: string;
}
