import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { inspect } from 'util';
import { ErrorDto } from '../models/error.model';

@Catch(UserInputError)
export class UserInputExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger('UserInputExceptionFilter');

  catch({ message }: UserInputError, host: ArgumentsHost): ErrorDto {
    const gqlHost = GqlArgumentsHost.create(host);
    this.logger.verbose(message, inspect(gqlHost.getContext().req.body));
    return { message };
  }
}
