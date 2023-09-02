import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
// import RabbitMQProvider from '../../../providers/broker/rabbitmq.provider';
// import { QUEUE_EVENT } from '../../../enums/queue_event.enum';
// import { RoutingKeys } from '../../../enums/routingkeys.enum';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(private repository: OrderRepository) {}
// placeorderForBook
  async placeOrderForBook(customerId: string, bookId: string) {
    try {
      const order = await this.repository.placeOrder(customerId, bookId);

      return order;
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      return error;
    }
  }

  // cancelOrderForBook
  async cancelOrderForBook(customerId: string, bookId: string) {
    try {
      const order = await this.repository.cancelOrder(customerId, bookId);
      return order;
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      return error;
    }
  }

  //getorderForBook
  async getAllOrders() {
    try {
      // Use Prisma to fetch all orders from the database
      const orders = await this.repository.getAllOrders();

      return orders;
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      throw error; 
    }
  }
}
