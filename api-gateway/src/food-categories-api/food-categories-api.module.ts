import { Module } from '@nestjs/common';
import { FoodCategoriesApiService } from './food-categories-api.service';
import { FoodCategoriesApiController } from './food-categories-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [FoodCategoriesApiController],
  providers: [FoodCategoriesApiService],
  imports:[
    ClientsModule.register([{
      name: "PRODUCT_NAME",
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: "Product_queue" ,//truyen dung queue o service muon ket noi,
        queueOptions:{
          durable: false
        }
      }
    }])
  ]
})
export class FoodCategoriesApiModule {}
