import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthApiModule } from './auth-api/auth-api.module';
import { UserApiModule } from './user-api/user-api.module';
import { ProductApiModule } from './product-api/product-api.module';
import { FoodCategoriesApiModule } from './food-categories-api/food-categories-api.module';
import { OrderApiModule } from './order-api/order-api.module';
import { SearchApiModule } from './search-api/search-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthApiModule,
    UserApiModule,
    ProductApiModule,
    FoodCategoriesApiModule,
    OrderApiModule,
    SearchApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
