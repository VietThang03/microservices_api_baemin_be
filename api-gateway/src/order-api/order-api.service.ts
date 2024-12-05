import { Injectable } from '@nestjs/common';
import { CreateOrderApiDto } from './dto/create-order-api.dto';
import { UpdateOrderApiDto } from './dto/update-order-api.dto';

@Injectable()
export class OrderApiService {
  create(createOrderApiDto: CreateOrderApiDto) {
    return 'This action adds a new orderApi';
  }

  findAll() {
    return `This action returns all orderApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderApi`;
  }

  update(id: number, updateOrderApiDto: UpdateOrderApiDto) {
    return `This action updates a #${id} orderApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderApi`;
  }
}
