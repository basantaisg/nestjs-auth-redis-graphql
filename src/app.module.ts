import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [AuthModule, UserModule, CommonModule, RedisModule],
})
export class AppModule {}
