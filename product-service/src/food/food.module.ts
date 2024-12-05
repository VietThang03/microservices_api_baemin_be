import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  exports:[FoodService],
  imports:[CacheModule.register({
    store: redisStore,
    host: "localhost",
    port: 6379,
    auth_pass: "123456",
    ttl: 50000
  })]
})
export class FoodModule {}
