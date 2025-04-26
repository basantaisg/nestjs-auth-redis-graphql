import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    JwtService,
    PrismaService,
  ],
})
export class AuthModule {}
