import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderApiDto } from './create-order-api.dto';

export class UpdateOrderApiDto extends PartialType(CreateOrderApiDto) {}
