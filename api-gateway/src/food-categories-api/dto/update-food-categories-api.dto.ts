import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodCategoriesApiDto } from './create-food-categories-api.dto';

export class UpdateFoodCategoriesApiDto extends PartialType(CreateFoodCategoriesApiDto) {}
