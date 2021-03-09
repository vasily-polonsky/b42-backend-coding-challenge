import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ICreateUser } from './create-user.interface';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
