import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { FoodCategoriesApiService } from './food-categories-api.service';
import { CreateFoodCategoriesApiDto } from './dto/create-food-categories-api.dto';
import { UpdateFoodCategoriesApiDto } from './dto/update-food-categories-api.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('/api/v1/food-categories')
export class FoodCategoriesApiController {
  constructor(
    private readonly foodCategoriesApiService: FoodCategoriesApiService,
    @Inject('PRODUCT_NAME') private productService: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createFoodCategoriesApiDto: CreateFoodCategoriesApiDto) {
    const createNewFoodCategory = await lastValueFrom(
      this.productService.send(
        'Create_food_category',
        createFoodCategoriesApiDto,
      ),
    );
    return createNewFoodCategory;
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('name') name: string,
  ) {
    const getAllFoodCategories = await lastValueFrom(this.productService.send('Get_All_Food_Cat', {
      page: page,
      limit: limit,
      name: name
    }))
    return getAllFoodCategories;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const getFoodCategoryById = await lastValueFrom(
      this.productService.send('Get_Food_Cat_Id', id),
    );
    return getFoodCategoryById;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFoodCategoriesApiDto: UpdateFoodCategoriesApiDto,
  ) {
    const updateFoodCategory = await lastValueFrom(
      this.productService.send('Update_Food_Cat', {
        id: id,
        updateFoodCategoriesApiDto: updateFoodCategoriesApiDto,
      }),
    );
    return updateFoodCategory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteFoodCategoryById = await lastValueFrom(
      this.productService.send('Delete_Food_Cat', id),
    );
    return deleteFoodCategoryById;
  }
}
