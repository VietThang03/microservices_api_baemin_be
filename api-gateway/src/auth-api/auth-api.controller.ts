import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { CreateAuthApiDto, RegisterUserDto } from './dto/create-auth-api.dto';
import { UpdateAuthApiDto } from './dto/update-auth-api.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Public } from 'src/decorator/customize';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/api/v1/auth')
export class AuthApiController {
  constructor(
    private readonly authApiService: AuthApiService,
    @Inject('USER_NAME') private userService: ClientProxy,
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() credentials: { username: string, password: string }) {
    const dataUserLogin = await lastValueFrom(
      this.userService.send('Login', credentials),
    ); 
    return dataUserLogin;
  }

  @Public()
  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const dataUserRegister = await lastValueFrom(
      this.userService.send('Register', registerUserDto),
    );
    console.log(dataUserRegister)
    return dataUserRegister;
  }

  @Post('/logout')
  async logout(@Req() req) {
    const dataUserLogout = await lastValueFrom(
      this.userService.send('Logout', req.user),
    );
    return dataUserLogout;
   // console.log(req.user)
  }
}
