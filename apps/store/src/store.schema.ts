import * as mongoose from 'mongoose';

const ContactInfoSchema = new mongoose.Schema({
  contact_infos_id: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: String, required: true },
});

const CategorySchema = new mongoose.Schema({
  store_category_id: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});


const HeadquarterSchema = new mongoose.Schema({
  headquarter_id: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});

export const StoreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  longitude: String,
  latitude: String,
  contact_infos: {
    type: ContactInfoSchema,
    required: true,
  },
  headquarter: {
    type: HeadquarterSchema,
    required: true,
  },
  store_category: {
    type: CategorySchema,
    required: true,
  },
  image: String,
});

export interface Store extends mongoose.Document {
  title: string;
  longitude: string;
  latitude: string;
  contact_infos: {
    id: string;
    adress: string;
    tel: string;
  };
  headquarter: {
    id: string;
    title: string;
    image: string;
  };
  store_category: {
    id: string;
    title: string;
    image: string;
  };
  image: string;
}
