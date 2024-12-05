import { Injectable } from '@nestjs/common';
import { CreateFoodCategoriesApiDto } from './dto/create-food-categories-api.dto';
import { UpdateFoodCategoriesApiDto } from './dto/update-food-categories-api.dto';

@Injectable()
export class FoodCategoriesApiService {
  create(createFoodCategoriesApiDto: CreateFoodCategoriesApiDto) {
    return 'This action adds a new foodCategoriesApi';
  }

  findAll() {
    return `This action returns all foodCategoriesApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodCategoriesApi`;
  }

  update(id: number, updateFoodCategoriesApiDto: UpdateFoodCategoriesApiDto) {
    return `This action updates a #${id} foodCategoriesApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodCategoriesApi`;
  }
}
