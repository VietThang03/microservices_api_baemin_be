import { Module } from '@nestjs/common';
import { OrderApiService } from './order-api.service';
import { OrderApiController } from './order-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrderApiController],
  providers: [OrderApiService],
  imports:[
    ClientsModule.register([{
      name: "ORDER_NAME",
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@some-rabbit:5672'],
        queue: "Order_queue" ,//truyen dung queue o service muon ket noi,
        queueOptions:{
          durable: false
        }
      }
    }])
  ]
})
export class OrderApiModule {}
