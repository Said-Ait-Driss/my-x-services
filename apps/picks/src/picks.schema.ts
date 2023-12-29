import * as mongoose from 'mongoose';

export const PicksSchema = new mongoose.Schema({
    name: String,
    brand: String,
    store_id: String,
    image: String,
  });

  export interface Picks extends mongoose.Document {
    name: string,
    brand: string,
    store_id: string,
    image: string,
  }