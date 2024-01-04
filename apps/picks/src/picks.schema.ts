import * as mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    store_id: String,
    title: String,
});

const CurrentOfferSchema = new mongoose.Schema({
    offer_id: String,
    price: Number,
    discount: Number, // percentage
});

export const PicksSchema = new mongoose.Schema({
    name: String,
    brand: String,
    store: StoreSchema,
    image: String,
    original_price: Number,
    current_offer: CurrentOfferSchema,
});

interface Store extends mongoose.Document {
    store_id: String;
    title: String;
}

interface CurrentOffer extends mongoose.Document {
    offer_id: string;
    price: number;
    discount: number;
}

export interface Picks extends mongoose.Document {
    name: string;
    brand: string;
    store: Store;
    image: string;
    original_price: number;
    current_offer: CurrentOffer;
}
