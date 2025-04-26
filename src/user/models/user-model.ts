import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role as PrismaRole } from '@prisma/client';
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => String)
  role: PrismaRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
