import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { User } from 'src/user/models/user-model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: CreateUserInput) {
    const result = await this.authService.register(input);
    return result.user;
  }
}
