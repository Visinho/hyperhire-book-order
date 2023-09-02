import { Module } from '@nestjs/common';
import { OrderRepository } from './repository/order.repository';
import { ProcessQueueService } from '../../providers/broker/processqueue.service';
import RabbitMQProvider from '../../providers/broker/rabbitmq.provider';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    OrderRepository,
    RabbitMQProvider,
    ProcessQueueService,
    OrderService,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
