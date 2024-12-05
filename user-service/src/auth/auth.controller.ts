import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from 'src/decorator/customize';
import { register } from 'module';
import { RegisterUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User, UserLogin } from 'src/interface/user';
//import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  //@UseGuards(LocalAuthGuard)
  @MessagePattern('Login')
  handleLogin( @Payload() data: UserLogin, @Res({passthrough: true}) res) {
    return this.authService.login(data, res);
  }

  @Public()
  //@UseGuards(LocalAuthGuard)
  @MessagePattern('Register') 
  create(@Payload() registerUserDto: RegisterUserDto, @Res({passthrough: true}) res) {
    console.log(registerUserDto)
    return this.authService.register(registerUserDto, res);
  }

  @Public()
  @MessagePattern('Logout')
  async handleLogout( @Payload() data: User, @Res({passthrough: true}) response: Response){
    //console.log(data)
    return await this.authService.logout(data, response)
  }
}