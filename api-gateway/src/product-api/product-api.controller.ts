import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { ProductApiService } from './product-api.service';
import { CreateProductApiDto } from './dto/create-product-api.dto';
import { UpdateProductApiDto } from './dto/update-product-api.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/decorator/customize';

@Controller('/api/v1/foods')
export class ProductApiController {
  constructor(private readonly productApiService: ProductApiService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy
  ) {

  }

  @Post()
  async create(@Body() createProductApiDto: CreateProductApiDto) {
    const createNewFood = await lastValueFrom(this.productService.send('Create_food', createProductApiDto));
    return createNewFood;
  }

  @Public()
  @Get()
  async findAll(@Query("page") page: string, @Query("limit") limit: string, @Query("name") name: string) {
    const getAllFoods = await lastValueFrom(this.productService.send('Get_all_foods', {
      page: page,
      limit: limit,
      name: name
    }))
    return getAllFoods;
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findFood = await lastValueFrom(this.productService.send('Find_food', id))
    return findFood;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductApiDto: UpdateProductApiDto) {
    const updateFood = await lastValueFrom(this.productService.send('Update_food', {
      id: id,
      updateProductApiDto: updateProductApiDto
    }));
    return updateFood;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteFood = await lastValueFrom(this.productService.send('Delete_food', id))
    return deleteFood;
  }
}
