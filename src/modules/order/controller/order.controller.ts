import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderRepository } from '../repository/order.repository';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { createOrderDTO } from '../dto/createorder.input';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({
    description: 'Cancel order updated successfully!',
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch('/:customerId/book/:bookId')
  async cancelOrder(
    @Param('customerId') customerId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.orderService.cancelOrderForBook(customerId, bookId);
  }

  @ApiOkResponse({
    description: 'Book order made successfully!',
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Post('/create-order')
  async createOrder(
    @Body() payload: createOrderDTO
  ) {
    return this.orderService.placeOrderForBook(payload.customerId, payload.bookId);
  }
  
  @ApiOkResponse({
    description: 'All orders fetched successfully!',
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get('/get-all-orders') // Define your route, e.g., '/get-all-orders'
  async getAllOrders() {
    try {
      const orders = await this.orderService.getAllOrders(); // Call your service method to get all orders
      return orders; 
    } catch (error) {
      return { message: 'Error fetching orders' };
    }
  }
}
