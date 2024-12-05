import { Module } from '@nestjs/common';
import { SearchApiService } from './search-api.service';
import { SearchApiController } from './search-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [SearchApiController],
  providers: [SearchApiService],
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
export class SearchApiModule {}
