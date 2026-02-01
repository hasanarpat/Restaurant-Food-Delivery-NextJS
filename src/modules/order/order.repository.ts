import { Order, IOrder } from './order.schema';

export class OrderRepository {
  async create(data: Partial<IOrder>): Promise<IOrder> {
    return Order.create(data);
  }

  async findById(id: string): Promise<IOrder | null> {
    return Order.findById(id).populate('items.productId');
  }

  async findByUserId(userId: string): Promise<IOrder[]> {
    return Order.find({ userId, deletedAt: null }).sort({ createdAt: -1 });
  }

  async findAll(): Promise<IOrder[]> {
    return Order.find({ deletedAt: null }).sort({ createdAt: -1 });
  }

  async update(id: string, data: Partial<IOrder>): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(id, data, { new: true });
  }
}

export const orderRepository = new OrderRepository();
