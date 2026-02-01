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
  paymentInfo?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
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

    // Simulated Payment Validation Logic
    let paymentStatus: 'PAID' | 'PENDING' | 'FAILED' = 'PAID';

    if (data.paymentInfo) {
      const { cardNumber, expiryDate, cvv } = data.paymentInfo;
      const cleanCard = cardNumber.replace(/\s/g, '');

      // Special Logic: Magic Card (1234 1234 1234 1234)
      if (cleanCard === '1234123412341234') {
        if (expiryDate !== '01/01' || cvv !== '123') {
          // In a real app, this might fail, but for demo we just process it as standard if it doesn't match magic combo exactly
          // unless we want to enforce it. Let's just say magic combo is ALWAYS success regardless of status logic.
        }
      }

      // In a real world app, we would call a payment gateway (Stripe/PayPal) here.
      // For this portfolio demo, we assume any card sent is "PAID".
      paymentStatus = 'PAID';
    }

    const orderData: Partial<IOrder> = {
      userId: data.userId as any, // Cast to ObjectID
      items: orderItems,
      subTotal,
      deliveryFee,
      total,
      status: 'PREPARING', // Simulate active order
      paymentStatus, // Use result of simulation
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
