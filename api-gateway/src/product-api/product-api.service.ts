import { Injectable } from '@nestjs/common';
import { CreateProductApiDto } from './dto/create-product-api.dto';
import { UpdateProductApiDto } from './dto/update-product-api.dto';

@Injectable()
export class ProductApiService {
  create(createProductApiDto: CreateProductApiDto) {
    return 'This action adds a new productApi';
  }

  findAll() {
    return `This action returns all productApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productApi`;
  }

  update(id: number, updateProductApiDto: UpdateProductApiDto) {
    return `This action updates a #${id} productApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} productApi`;
  }
}
