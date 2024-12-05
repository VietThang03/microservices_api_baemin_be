import { Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { AuthApiController } from './auth-api.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:123456@localhost:5672'],
          queue: 'User_queue', //truyen dung queue o service muon ket noi,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'apibeaminsecretkeyjwt',
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthApiController],
  providers: [AuthApiService, JwtStrategy],
  exports: [AuthApiService]
})
export class AuthApiModule {}
