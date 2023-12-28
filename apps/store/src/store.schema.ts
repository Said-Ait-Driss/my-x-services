import * as mongoose from 'mongoose';

export const StoreSchema = new mongoose.Schema({
    title: String,
    longitude: String,
    latitude: String,
    contact_info_id: Number,
    headquarter_id: Number,
    store_category_id: Number,
    image: String,
  });

  export interface Store extends mongoose.Document {
    title: string,
    longitude: string,
    latitude: string,
    contact_info_id: number,
    headquarter_id: number,
    store_category_id: number,
    image: string,
  }