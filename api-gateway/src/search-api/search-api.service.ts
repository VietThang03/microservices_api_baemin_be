import { Injectable } from '@nestjs/common';
import { CreateSearchApiDto } from './dto/create-search-api.dto';
import { UpdateSearchApiDto } from './dto/update-search-api.dto';

@Injectable()
export class SearchApiService {
  create(createSearchApiDto: CreateSearchApiDto) {
    return 'This action adds a new searchApi';
  }

  findAll() {
    return `This action returns all searchApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} searchApi`;
  }

  update(id: number, updateSearchApiDto: UpdateSearchApiDto) {
    return `This action updates a #${id} searchApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} searchApi`;
  }
}
