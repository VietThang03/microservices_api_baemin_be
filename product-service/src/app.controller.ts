import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //dung decorator MessagePattern de lay du lieu tu api gateway
  @MessagePattern("data_food")
  async getProduct(@Payload() data) {
    console.log(data)
    return await this.appService.getProduct();
  }
}
