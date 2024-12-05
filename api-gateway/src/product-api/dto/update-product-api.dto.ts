import { PartialType } from '@nestjs/mapped-types';
import { CreateProductApiDto } from './create-product-api.dto';

export class UpdateProductApiDto extends PartialType(CreateProductApiDto) {}
