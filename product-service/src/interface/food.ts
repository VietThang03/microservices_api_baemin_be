import { UpdateFoodCategoryDto } from "src/food-categories/dto/update-food-category.dto"
import { UpdateFoodDto } from "src/food/dto/update-food.dto"

export interface UpdateFood{
    id: string
    updateProductApiDto: UpdateFoodDto
}

export interface UpdateFoodCategory{
    id: string
    updateFoodCategoriesApiDto: UpdateFoodCategoryDto
}

export interface QueryDataFood{
    page: number    
    limit: number
    name: string
}

export interface QueryDataSearch{
    page: number    
    limit: number
    name: string
}


export interface QueryDataFoodCategory{
    page: number    
    limit: number
    name: string
}

export interface FoodDataCache{
    message: string
    meta: {
      current: number
      pageSize: number
      pages: number
      total: number
    },
    data: any
}