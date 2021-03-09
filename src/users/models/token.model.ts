import { Field, ObjectType } from '@nestjs/graphql';
import { createResponseType } from '../../common/models/create-response-type';

@ObjectType()
export class TokenModel {
  @Field()
  access_token: string;
}

export const TokenType = createResponseType(TokenModel);
