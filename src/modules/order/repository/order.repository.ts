import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class OrderRepository {
  private readonly logger = new Logger(OrderRepository.name);
  constructor(private prisma: PrismaService) {}

  // place order repository
  async placeOrder(customerId: string, bookId: string) {
    try {
      const order = await this.prisma.order.create({
        data: {
          customerId,
          bookId,
          status: true,
        },
      });

      return order;
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      return error;
    }
  }

  // cancel order repository
  async cancelOrder(customerId: string, bookId: string) {
    try {
      // Update the order status to false
      const updatedOrder = await this.prisma.order.updateMany({
        where: {
          customerId,
          bookId,
        },
        data: {
          status: false,
        },
      });
  
      if (updatedOrder.count === 0) {
        throw new Error('Order not found.');
      }
  
      return updatedOrder;
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      return error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.prisma.order.findMany();
      return orders;
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      return error;
    }
  }
  
}
