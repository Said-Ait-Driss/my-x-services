import * as mongoose from 'mongoose';

export const OrdersSchema = new mongoose.Schema({
  order_date: Date,
  client_id: String,
  headquarter_id: String,
  status: String,
});

export interface Orders extends mongoose.Document {
  order_date: string;
  client_id: string;
  headquarter_id: string;
  status: string
}
