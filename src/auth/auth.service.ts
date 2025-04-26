import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: CreateUserInput) {
    const existingEmail = await this.userService.findUserByEmail(input.email);
    if (existingEmail) throw new ConflictException('Email already exists!');

    const existingUsername = await this.userService.findUserByUsername(
      input.username,
    );

    if (existingUsername)
      throw new ConflictException('Username already exists!');

    const user = await this.userService.createUser(input);

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
