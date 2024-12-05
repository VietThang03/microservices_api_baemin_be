import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';


@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports:[CacheModule.register({
    store: redisStore,
    host: "some-redis",
    port: 6379,
    auth_pass: "123456",
    ttl: 50000
  })]
})
export class SearchModule {}
