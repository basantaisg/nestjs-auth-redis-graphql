import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [
    AuthService,
    AuthResolver,
    JwtService,
    PrismaService,
    UserService,
  ],
})
export class AuthModule {}
