import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { AuthService } from './auth.service';
import { AuthPayload } from './models/auth-payload.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async register(@Args('input') input: CreateUserInput) {
    const result = await this.authService.register(input);
    return result.user;
  }
}
