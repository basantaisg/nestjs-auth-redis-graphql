import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user-model';

@ObjectType()
export class AuthPayload {
  @Field({ nullable: true })
  accessToken?: string;

  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}
