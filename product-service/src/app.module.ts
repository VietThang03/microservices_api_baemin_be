import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
import { FoodCategoriesModule } from './food-categories/food-categories.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), FoodModule, FoodCategoriesModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
