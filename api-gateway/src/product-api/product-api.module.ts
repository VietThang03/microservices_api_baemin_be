import { Module } from '@nestjs/common';
import { ProductApiService } from './product-api.service';
import { ProductApiController } from './product-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductApiController],
  providers: [ProductApiService],
  imports:[
    ClientsModule.register([{
      name: "PRODUCT_NAME",
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@some-rabbit:5672'],
        queue: "Product_queue" ,//truyen dung queue o service muon ket noi,
        queueOptions:{
          durable: false
        }
      }
    }])
  ]
})
export class ProductApiModule {}
