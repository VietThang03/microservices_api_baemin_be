import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { SearchApiService } from './search-api.service';
import { CreateSearchApiDto } from './dto/create-search-api.dto';
import { UpdateSearchApiDto } from './dto/update-search-api.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/decorator/customize';
import { lastValueFrom } from 'rxjs';

@Controller('/api/v1/search')
export class SearchApiController {
  constructor(private readonly searchApiService: SearchApiService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy
  ) {}

  @Public()
  @Get()
  async searchFoods(
    @Query('name') name: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    const search = await lastValueFrom(this.productService.send("SEARCH_FOOD", {
      name: name,
      page: page,
      limit: limit
    }))
    return search;
  }

  @Post()
  create(@Body() createSearchApiDto: CreateSearchApiDto) {
    return this.searchApiService.create(createSearchApiDto);
  }

  @Get()
  findAll() {
    return this.searchApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchApiDto: UpdateSearchApiDto) {
    return this.searchApiService.update(+id, updateSearchApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchApiService.remove(+id);
  }
}
