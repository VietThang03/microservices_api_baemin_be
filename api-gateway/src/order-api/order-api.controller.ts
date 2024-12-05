import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req, Query } from '@nestjs/common';
import { OrderApiService } from './order-api.service';
import { CreateOrderApiDto } from './dto/create-order-api.dto';
import { UpdateOrderApiDto } from './dto/update-order-api.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('/api/v1/orders')
export class OrderApiController {
  constructor(private readonly orderApiService: OrderApiService,
    @Inject("ORDER_NAME") private orderService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createOrderApiDto: CreateOrderApiDto, @Req() req) {
    const createNewOrder = await lastValueFrom(this.orderService.send("Create_order", {
      createOrderApiDto: createOrderApiDto,
      user: req.user
    }))
    return createNewOrder;
  }

   //@Public()
   @Post('confirm/:id')
   async confirmPayment(@Param('id') id: string) {
    const confirmOrder = await lastValueFrom(this.orderService.send("Confirm_Order", id))
     return confirmOrder;
   }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string, @Req() req) {
    const getAllOrders = await lastValueFrom(this.orderService.send("Get_all_orders", {
      page: page,
      limit: limit,
      user: req.user
    }))
    return getAllOrders;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orderById = await lastValueFrom(this.orderService.send("Order_By_Id", id))
    return orderById;
  }

  @Get('user/my-order')
  async getOrderUserId( @Req() req) {
    const getOrderUser = await lastValueFrom(this.orderService.send("Get_Order_User", req.user))
    return getOrderUser;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderApiDto: UpdateOrderApiDto) {
    const updateOrder = await lastValueFrom(this.orderService.send("Update_order", {
      id: id,
      updateOrderApiDto: updateOrderApiDto
    }))
    return updateOrder;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteOrderById = await lastValueFrom(this.orderService.send("Delete_Order_By_Id", id))
    return deleteOrderById;
  }
}
