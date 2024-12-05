import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from 'src/user/dto/create-user.dto';
import { User, UserLogin } from 'src/interface/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prismaClient: PrismaService,
  ) {}

  createRefreshtoken(id: string, username: string, email: string) {
    const payload = {
      sub: 'refresh token',
      iss: 'from server',
      id,
      username,
      email,
    };
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
    return refresh_token;
  }

  createAccesstoken(id: string, username: string, email: string) {
    const payload = {
      sub: 'access token',
      iss: 'from server',
      id,
      username,
      email,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
    return access_token;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUserByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        // const objUser = {
        //   ...user,
        // };
        return user;
      }
      //return user
    }
    return null;
  }

  async login(data: UserLogin, response: Response) {
    //const {username, password } = user;
    const user = await this.prismaClient.users.findUnique({
      where: {
        username: data.username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const isValid = this.usersService.isValidPassword(
      data.password,
      user.password,
    );
    if (!isValid) {
      throw new NotFoundException(`Password does not match`);
    }
    const refresh_token = this.createRefreshtoken(
      String(user.id),
      user.username,
      user.email,
    );

    await this.prismaClient.refresh_tokens.create({
      data: {
        token: refresh_token,
        user_id: user.id,
      },
    });
    // response.clearCookie('resfresh_token');
    // response.cookie('resfresh_token', refresh_token, {
    //   httpOnly: true,
    //   // maxAge: ms(this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRE"))
    //   maxAge: 604800000,
    // });
    const userLogin = await this.prismaClient.users.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
      },
    });
    return {
      message: 'Login successfully',
      access_token: this.createAccesstoken(
        String(user.id),
        user.username,
        user.email,
      ),
      refresh_token: refresh_token,
      user: userLogin,
    };
  }

  async register(data: RegisterUserDto, response: Response) {
    const existingEmail = await this.prismaClient.users.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      throw new UnauthorizedException('Email already in system!');
    }
    const newPassword = this.usersService.hashPassword(data.password);
    let newUser = await this.prismaClient.users.create({
      data: {
        ...data,
        password: newPassword,
      },
    });
    const refresh_token = this.createRefreshtoken(
      String(newUser.id),
      newUser.username,
      newUser.email,
    );
    await this.prismaClient.refresh_tokens.create({
      data: {
        user_id: newUser.id,
        token: refresh_token,
      },
    });
    const result = await this.prismaClient.users.findUnique({
      where: { id: newUser.id },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });
    // response.clearCookie('refresh_token')
    // response.cookie('resfresh_token', refresh_token, {
    //   httpOnly: true,
    //   // maxAge: ms(this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRE"))
    //   maxAge: 604800000,
    // });
    return {
      message: 'Register successfully!',
      user: result,
      access_token: this.createAccesstoken(
        String(newUser.id),
        newUser.username,
        newUser.email,
      ),
      refresh_token: refresh_token,
    };
  }

  account(user: User) {
    return {
      message: 'Get account user successfully',
      user,
    };
  }

  async logout(user: User, response: Response) {
    const { id } = user;
    // Tìm kiếm bản ghi theo user_id (sử dụng findFirst thay vì whereUnique)
    const existingToken = await this.prismaClient.refresh_tokens.findFirst({
      where: {
        user_id: Number(id), // Tìm theo user_id
      },
    });
    if (existingToken) {
      await this.prismaClient.refresh_tokens.delete({
        where: {
          id: existingToken.id,
        },
      });
      return {
        message: 'Logout successfully',
      };
    }else{
      throw new NotFoundException("Không tìm thấy token cho user")
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
