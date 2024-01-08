import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    client_id: String,
    username: String,
});

export const HeadquarterSchema = new mongoose.Schema({
    headquarter_id: String,
    title: String,
});

export const OrdersSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        default: Date.now,
    },
    client: ClientSchema,
    headquarter: HeadquarterSchema,
    status: {
        type: String,
        default: 'Pending', // Pending, Processing, Shipped, Delivered, Cancelled, Returned, On Hold, Completed,
    },
    picks_count: {
        type: Number,
        default: 1,
    },
});

export interface Orders extends mongoose.Document {
    order_date: string;
    client_id: string;
    headquarter_id: string;
    status: string;
}
