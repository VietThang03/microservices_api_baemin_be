import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FoodDataCache } from 'src/interface/food';

@Injectable()
export class FoodService {

  constructor(
    private prismaClient: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ){}

  async create(createFoodDto: CreateFoodDto) {
    const data = {
      ... createFoodDto
    }
    const newFood = await this.prismaClient.foods.create({
      data
    })
    const food = await this.prismaClient.foods.findUnique({
      where: {id: newFood.id}
    })
    // const[newFood, food] = await Promise.all([
    //   this.prismaClient.foods.create({
    //     data
    //   }),
    //   this.prismaClient.foods.findUnique({
    //     where: {id: newFood.id}
    //   })
    // ])
    await this.prismaClient.inventory.create({
      data:{
        food_id: food.id,
        quantity: food.stock
      }
    })
    await this.cacheManager.del("FOODS")
    return {
      message: 'Create food successfully!!!',
      data: food
    };
  }

  async findAll(page: number, limit: number, name: string) {
    //this.cacheManager.del("FOODS")
    const dataFoods =  await this.cacheManager.get<FoodDataCache>("FOODS");
    const totalRecords = await this.prismaClient.foods.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const defaultLimit = limit ? limit : 20;
    const defaultPage = page ? page : 1;

    if(dataFoods){
      if(page !== dataFoods.meta.current){
         await this.cacheManager.del("FOODS")
      }else{
        return dataFoods
      }
    }
       
    const foods = await this.prismaClient.foods.findMany({
      where: name ? { name: { contains: name,  mode: 'insensitive' }} : {},
      skip: (defaultPage - 1) * limit,
      take: defaultLimit,
      include:{
        food_categories: {
          select:{
            name: true
          }
        }
      }
    });

    const result = {
      message: 'Get all foods successfully!!!',
      meta: {
        current: page,
        pageSize: limit,
        pages: totalPages,
        total: totalRecords,
      },
      data: foods,
    };
    await this.cacheManager.set("FOODS", result)

    return result;
  }

  async findOne(id: number) {
    const food = await this.prismaClient.foods.findUnique({
      where: {id},
      include:{
        food_categories: {
          select:{
            name: true
          }
        }
      }
    })
    if(!food){
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return{
      message: 'Find successfully!!!',
      data: food
    };
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    await this.findOne(id)
    const data = {
      ...updateFoodDto
    }
    const updateFood = await this.prismaClient.foods.update({
      where: {id},
      data
    })
    await this.prismaClient.inventory.update({
      where: {
        food_id: id
      },
      data:{
        quantity: data.stock
      }
    })
   await this.cacheManager.del("FOODS")
    return {
      message: 'Update food successfully!',
      data: updateFood
    };
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prismaClient.foods.delete({
      where: {id}
    })
    return {
      message: 'Delete food successfully!'
    };
  }
}