import * as mongoose from 'mongoose';

export const Store_categoriesSchema = new mongoose.Schema({
    title: String,
    image: String,
  });

  export interface Store_categories extends mongoose.Document {
    title: string,
    image: string,
  }