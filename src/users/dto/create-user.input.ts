import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { ICreateUser } from './create-user.interface';

@InputType()
export class CreateUserInput implements ICreateUser {
  @IsOptional()
  @MinLength(3)
  @Field({ nullable: true })
  name?: string;

  @Field()
  password: string;

  @IsEmail()
  @Field()
  email: string;
}
