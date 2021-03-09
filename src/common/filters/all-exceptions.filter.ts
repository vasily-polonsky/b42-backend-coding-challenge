import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { ErrorDto } from '../models/error.model';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: UserInputError): ErrorDto {
    const message = Array.isArray(exception?.response?.message)
      ? exception?.response?.message.join()
      : exception?.response?.message || exception?.message;
    return { message };
  }
}
