import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user-model';
import { CreateUserInput } from './dtos/create-user.input';
import { IsEmail } from 'class-validator';
import { UpdateUserInput } from './dtos/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User)
  findUserById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findUserById(id);
  }

  @Query(() => User)
  findUserByEmail(@Args('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Query(() => User)
  findUserByUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.userService.findUserByUsername(username);
  }

  @Mutation(() => User)
  updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
