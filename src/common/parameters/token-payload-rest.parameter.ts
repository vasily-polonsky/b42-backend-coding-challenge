import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from '../jwt/jwt.strategy';

export const TokenPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): ITokenPayload => {
    return context.switchToHttp().getRequest().user;
  },
);
