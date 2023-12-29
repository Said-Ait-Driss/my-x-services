import * as mongoose from 'mongoose';

export const Picks_orderSchema = new mongoose.Schema({
  picks_id: String,
  order_id: String,
  picks_quantity: Number,
});

export interface Picks_order extends mongoose.Document {
  picks_id: string;
  order_id: string;
  picks_quantity: number;
}
