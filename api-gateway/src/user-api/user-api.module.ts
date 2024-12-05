import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService],
  imports:[
    ClientsModule.register([{
      name: "USER_NAME",
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@some-rabbit:5672'],
        queue: "User_queue" ,//truyen dung queue o service muon ket noi,
        queueOptions:{
          durable: false
        }
      }
    }])
  ]
})
export class UserApiModule {}
