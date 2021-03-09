import { registerAs } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';
import { envValidate } from '../common/env.validation';

class EnvironmentVariables {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  database: string;
}

export const mongooseConfig = registerAs('mongoose', () =>
  envValidate(
    {
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      database: process.env.MONGODB_DATABASE,
    },
    EnvironmentVariables,
  ),
);
