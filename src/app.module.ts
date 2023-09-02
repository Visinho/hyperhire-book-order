import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import systemConfig from './config/system.config';
import RabbitMQProvider from './providers/broker/rabbitmq.provider';
import { ProcessQueueService } from './providers/broker/processqueue.service';
import { PrismaService } from './database/prisma.service';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot({
      load: [systemConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RabbitMQProvider, ProcessQueueService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
