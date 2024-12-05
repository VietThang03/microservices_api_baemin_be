import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    Min,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class OrderItemDto {
    @IsNumber()
    @IsNotEmpty()
    food_id: number;
  
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number;
  
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    price: number;
  }
  
  export class CreateOrderApiDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
  }

