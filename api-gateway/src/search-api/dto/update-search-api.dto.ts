import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchApiDto } from './create-search-api.dto';

export class UpdateSearchApiDto extends PartialType(CreateSearchApiDto) {}
