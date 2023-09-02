import { Injectable } from '@nestjs/common';
import { QUEUE_EVENT } from '../../enums/queue_event.enum';
import { winstonLogger } from '../../helper/winston';
import { OrderService } from '../../modules/order/services/order.service';

@Injectable()
export class ProcessQueueService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private orderService: OrderService) {}

  /**
   * This method is responsible for processing consume queues from RabbitMQ
   * @param payload
   * @returns
   */
  async processQueue(payload: any) {
    try {
      const { event } = payload;
      switch (event.toLowerCase()) {
        case QUEUE_EVENT.CUSTOMER_CREATED:
          console.info('Calling customer created........');
          const order = await this.PlaceOrderForBook(payload);
          return order;

        case QUEUE_EVENT.BOOK_CREATED:
          console.info('Calling book created........');
        // const orders = await this.fetchBookFromQueue(payload);
        // return orders;

        default:
          break;
      }
    } catch (error) {
      winstonLogger.error('Error: \n %s', error);
    }
  }

  async PlaceOrderForBook(payload: any) {
    try {
      if (
        payload.event == QUEUE_EVENT.CUSTOMER_CREATED ||
        payload.event == QUEUE_EVENT.BOOK_CREATED
      ) {
        console.log('customer payload.....', payload);
        const customer = payload.customerPayload.customer;
        const book = payload.bookPayload;

        console.info('book payload.....', payload);
        if (customer.point === 100) {
          // place order
          const placeOrder = await this.orderService.placeOrderForBook(
            customer?.id,
            book?.id,
          );
          console.log('successful order', placeOrder);
          return placeOrder;
        }
      }
    } catch (error) {
      console.log('process failed', error);
      throw new Error(error.message);
    }
  }
  async fetchBookFromQueue(payload: any) {
    try {
      if (payload.event == QUEUE_EVENT.BOOK_CREATED) {
        console.log('book payload.....', payload);
        const book = payload.bookPayload;
        return book;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
