import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UpdateUserApiDto } from './dto/update-user-api.dto';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('/api/v1/user')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService,
    @Inject('USER_NAME') private userService: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserApiDto: CreateUserApiDto) {
    const createNewUser = await lastValueFrom(this.userService.send('Create_user', createUserApiDto))
    return createNewUser
  }

  @Get()
  async findAll(@Query("page") page: string, @Query("limit") limit: string, @Query("name") name: string) {
    const findAllUsers = await lastValueFrom(this.userService.send('Find_all_users', {
      page: page,
      limit: limit,
      name: name
    }))
    return findAllUsers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const detailUser = await lastValueFrom(this.userService.send('Find_user_id', id));
    return detailUser;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserApiDto: UpdateUserApiDto) {
    const dataUpdateUser = await lastValueFrom(this.userService.send('Update_user', {
      id: id,
      updateUserApiDto: updateUserApiDto
    }))
    return dataUpdateUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataDeleteUser = await lastValueFrom(this.userService.send('Delete_user', id));
    return dataDeleteUser;
  }
}
