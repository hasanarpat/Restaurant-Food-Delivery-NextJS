import { Order, IOrder } from './order.schema';

export class OrderRepository {
  async create(data: Partial<IOrder>): Promise<IOrder> {
    return Order.create(data);
  }

  async findById(id: string): Promise<IOrder | null> {
    return Order.findById(id).populate('items.productId');
  }

  async findByUserId(userId: string, query: any = {}): Promise<any> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { userId, deletedAt: null };

    const [data, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findAll(query: any = {}): Promise<any> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = { deletedAt: null };
    if (query.status) filter.status = query.status;

    const [data, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async update(id: string, data: Partial<IOrder>): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(id, data, { new: true });
  }
}

export const orderRepository = new OrderRepository();
