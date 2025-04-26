import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from './models/auth-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(input: CreateUserInput): Promise<AuthPayload> {
    const existingEmail = await this.userService.findUserByEmail(input.email);
    if (existingEmail) throw new ConflictException('Email already exists!');

    const existingUsername = await this.userService.findUserByUsername(
      input.username,
    );

    if (existingUsername)
      throw new ConflictException('Username already exists!');

    const user = await this.userService.createUser(input);

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      },
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
