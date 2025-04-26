import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { RedisModule } from './redis/redis.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'src/graphql/schema.gql',
      driver: ApolloDriver,
      sortSchema: true,
      context: ({ req }) => ({ req }), // for auth guards !
    }),
    AuthModule,
    UserModule,
    CommonModule,
    RedisModule,
    PrismaModule,
    AppResolver,
  ],
})
export class AppModule {}
