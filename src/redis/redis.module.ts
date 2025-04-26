import { Module } from '@nestjs/common';
import Redis from 'ioredis';

const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis();
  },
};

@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
