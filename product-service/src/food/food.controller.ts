import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Public } from 'src/decorator/customize';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QueryDataFood, UpdateFood } from 'src/interface/food';

@Controller()
export class FoodController {
  constructor(private readonly foodsService: FoodService) {}

  @MessagePattern('Create_food')
  create(@Payload() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Public()
  @MessagePattern('Get_all_foods')
  findAll(@Payload() data: QueryDataFood) {
    return this.foodsService.findAll(+data.page, +data.limit, data.name);
  }

  @Public()
  @MessagePattern('Find_food')
  findOne(@Payload() id: string) {
    return this.foodsService.findOne(+id);
  }

  @MessagePattern('Update_food')
  update(@Payload() data: UpdateFood) {
    return this.foodsService.update(+data.id, data.updateProductApiDto);
  }

  @MessagePattern('Delete_food')
  remove(@Payload() id: string) {
    return this.foodsService.remove(+id);
  }
}