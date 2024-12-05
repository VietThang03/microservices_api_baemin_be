import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FoodCategoriesService } from './food-categories.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { Public } from 'src/decorator/customize';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QueryDataFoodCategory, UpdateFoodCategory } from 'src/interface/food';

@Controller()
export class FoodCategoriesController {
  constructor(private readonly foodCategoriesService: FoodCategoriesService
  ) {}

  @MessagePattern('Create_food_category')
  create(@Payload() createFoodCategoryDto: CreateFoodCategoryDto) {
    return this.foodCategoriesService.create(createFoodCategoryDto);
  }

  @MessagePattern('Get_All_Food_Cat')
  findAll(@Payload() data: QueryDataFoodCategory) {
    return this.foodCategoriesService.findAll(+data.page, +data.limit, data.name);
  }

  @MessagePattern('Get_Food_Cat_Id')
  findOne(@Payload() id: string) {
    return this.foodCategoriesService.findOne(+id);
  }

  @MessagePattern('Update_Food_Cat')
  update(@Payload() data: UpdateFoodCategory) {
    return this.foodCategoriesService.update(+data.id, data.updateFoodCategoriesApiDto);
  }

  @MessagePattern('Delete_Food_Cat')
  remove(@Payload() id: string) {
    return this.foodCategoriesService.remove(+id);
  }
}