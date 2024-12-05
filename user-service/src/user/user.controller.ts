import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QueryDataUser, UpdateUser } from 'src/interface/user';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('Create_user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('Find_all_users')
  findAll(@Payload() data: QueryDataUser) {
    return this.userService.findAll(+data.page, +data.limit, data.name);
  }

  @MessagePattern('Find_user_id')
  findOne(@Payload() id: string) {
    return this.userService.findOne(+id);
  }

  @MessagePattern('Update_user')
  update(@Payload() data: UpdateUser) {
    return this.userService.update(Number(data.id), data.updateUserApiDto);
  }

  @MessagePattern('Delete_user')
  remove(@Payload() id: string) {
    return this.userService.remove(+id);
  }
}