import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
   // @Inject("PRODUCT_NAME") private productService: ClientProxy
  ) {}

  // @Get("/get-product")
  // async getHello() {
  //   //lastValueFrom ==> chuyen tu Observable sang Promise
  //   const dataFoods = await lastValueFrom(this.productService.send("data_food", "hello"));
  //   return dataFoods;
  // }

}
