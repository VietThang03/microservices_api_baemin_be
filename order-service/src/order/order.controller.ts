import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from 'src/interface/user';
import { CreateOrder, DataUpdateOrder, OrderQueryData } from 'src/interface/order';
//import { Public } from 'src/decorator/customize';

@Controller()
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @MessagePattern('Create_order')
  create(@Payload() data: CreateOrder) {
    //console.log(data.user)
    return this.ordersService.create(data.createOrderApiDto, data.user);
  }

  //@Public()
  @MessagePattern('Confirm_Order')
  async confirmPayment(@Payload() id: string) {
    return this.ordersService.confirmPayment(+id);
  }

  @MessagePattern('Get_all_orders')
  findAll(@Payload() data: OrderQueryData) {
    return this.ordersService.findAll(+data.page, +data.limit, data.user);
  }

  @MessagePattern('Order_By_Id')
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(+id);
  }

  @MessagePattern('Get_Order_User')
  getOrderUserId( @Payload() user: User) {
    return this.ordersService.findOrderUserId(user);
  }

  @MessagePattern('Update_order')
  update(@Payload() data: DataUpdateOrder) {
    return this.ordersService.update(+data.id, data.updateOrderApiDto);
  }

  @MessagePattern('Delete_Order_By_Id')
  remove(@Payload() id: string) {
    return this.ordersService.remove(+id);
  }
}