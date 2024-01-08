import { Injectable } from '@nestjs/common';
import { CreateOrdersDTO, ValidObjectIdDTO } from './orders.dto';
import { Orders } from './orders.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';
import { OrdersInterface } from './orders.interface';

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Orders') private readonly OrdersModel: Model<Orders>) {}

    getHello(): string {
        return 'Hello from orders service !';
    }

    async create(order: CreateOrdersDTO): Promise<Orders> {
        const createdOrder = new this.OrdersModel(order);
        return await createdOrder.save();
    }

    async findOne(id: ValidObjectIdDTO): Promise<Orders> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`order with id ${id} not found !`);
        }
        const result = await this.OrdersModel.findById(id).exec();
        if (!result) {
            throw new NotFoundException(`order with id ${id} not found !`);
        }
        return result;
    }

    async getClientOrders(client_id: string): Promise<Orders[]> {
        const result = await this.OrdersModel.find({
            'client.client_id': client_id,
        }).exec();

        if (!result) {
            throw new NotFoundException(`client with id ${client_id} has no orders yet !`);
        }
        return result;
    }

    async getHeadquarterOrders(headquarter_id: string): Promise<Orders[]> {
        const result = await this.OrdersModel.find({
            'headquarter.headquarter_id': headquarter_id,
        }).exec();

        if (!result) {
            throw new NotFoundException(`headquarter with id ${headquarter_id} has no orders yet !`);
        }

        return result;
    }

    async update(id: ValidObjectIdDTO, order: OrdersInterface): Promise<Orders> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`order with id ${id} not found !`);
        }

        const updateFields: Record<string, any> = {};

        if (order.order_date !== undefined) {
            updateFields['order_date'] = order.order_date;
        }

        if (order.picks_count !== undefined) {
            updateFields['picks_count'] = order.picks_count;
        }

        if (order.status !== undefined) {
            updateFields['status'] = order.status;
        }

        if (order.headquarter && order.headquarter.title !== undefined) {
            updateFields['headquarter.title'] = order.headquarter.title;
        }

        if (order.client && order.client.username !== undefined) {
            updateFields['client.username'] = order.client.username;
        }

        return await this.OrdersModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            {
                new: true,
            },
        ).exec();
    }

    async delete(id: ValidObjectIdDTO): Promise<any> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`order with id ${id} not found !`);
        }

        const picks = await this.OrdersModel.findByIdAndDelete(id).exec();

        if (!picks) {
            throw new NotFoundException(`order with id ${id} not found !`);
        }
        return picks;
    }

    async updateUserData(newUserData: any): Promise<any> {
        const updateFields: Record<string, any> = {};

        if (newUserData.client.username != undefined) {
            updateFields['client.username'] = newUserData.client.username;
        }
        return await this.OrdersModel.updateMany({ 'client.client_id': newUserData.client_id }, { $set: updateFields }, { new: true }).exec();
    }
}
