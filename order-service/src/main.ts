import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls:['amqp://admin:123456@localhost:5672'],
      queue: "Order_queue",
      queueOptions:{
        durable: false //khi rabbitmq bi ngat ket noi ==> cac du lieu dang duoc truyen di se bi huy
      }
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen();
}
bootstrap();
