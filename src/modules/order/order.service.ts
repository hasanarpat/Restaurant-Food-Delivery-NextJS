import { orderRepository } from './order.repository';
import { productRepository } from '../product/product.repository';
import { AppError } from '@/core/errors/AppError';
import { IOrder, IOrderItem } from './order.schema';

interface CreateOrderDTO {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    selectedOptions?: { title: string; additionalPrice: number }[];
  }[];
  customerNote?: string;
}

export class OrderService {
  async createOrder(data: CreateOrderDTO) {
    let subTotal = 0;
    const orderItems: any[] = [];

    // Verify products and calculate price securely on backend
    for (const item of data.items) {
      const product = await productRepository.findById(item.productId);
      if (!product) {
        throw new AppError({
          message: `Product not found: ${item.productId}`,
          statusCode: 400,
          code: 'PRODUCT_NOT_FOUND',
        });
      }

      let itemPrice = product.price;

      // Add option prices
      if (item.selectedOptions) {
        for (const option of item.selectedOptions) {
          itemPrice += option.additionalPrice;
        }
      }

      subTotal += itemPrice * item.quantity;

      orderItems.push({
        productId: product._id,
        title: product.title, // Snapshot title
        price: Number(itemPrice.toFixed(2)), // Snapshot price
        quantity: item.quantity,
        selectedOptions: item.selectedOptions || [],
      });
    }

    subTotal = Number(subTotal.toFixed(2));
    const deliveryFee = subTotal > 30 ? 0 : 5; // Free delivery over $30
    // Total is subTotal + deliveryFee. Floating point addition again.
    const total = Number((subTotal + deliveryFee).toFixed(2));

    const orderData: Partial<IOrder> = {
      userId: data.userId as any, // Cast to ObjectID
      items: orderItems,
      subTotal,
      deliveryFee,
      total,
      status: 'PREPARING', // Simulate active order
      paymentStatus: 'PAID', // Simulate successful payment for portfolio demo
      customerNote: data.customerNote,
    };

    return orderRepository.create(orderData);
  }

  async getUserOrders(userId: string) {
    return orderRepository.findByUserId(userId);
  }

  async getAllOrders() {
    return orderRepository.findAll();
  }

  async getOrderById(id: string) {
    const order = await orderRepository.findById(id);
    if (!order) {
      throw new AppError({
        message: 'Order not found',
        statusCode: 404,
        code: 'ORDER_NOT_FOUND',
      });
    }
    return order;
  }

  async updateOrderStatus(id: string, status: string) {
    // Valid status check could go here
    const order = await orderRepository.update(id, { status } as any);
    if (!order) {
      throw new AppError({
        message: 'Order not found',
        statusCode: 404,
        code: 'ORDER_NOT_FOUND',
      });
    }
    return order;
  }
}

export const orderService = new OrderService();
