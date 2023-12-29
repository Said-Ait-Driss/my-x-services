import * as mongoose from 'mongoose';

export const Orders_deliverySchema = new mongoose.Schema({
  order_id: String,
  deliverer_id: String,
  client_id: String,
  store_id: String,
  adresse_to_delivery: String,
  delivery_date: Date,
});

export interface Orders_delivery extends mongoose.Document {
  order_id: string;
  deliverer_id: string;
  client_id: string;
  store_id: string;
  adresse_to_delivery: string;
  delivery_date: string;
}
