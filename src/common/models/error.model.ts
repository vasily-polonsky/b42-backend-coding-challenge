import { Field, ObjectType } from '@nestjs/graphql';

export interface ErrorDto {
  message: string;
}

@ObjectType()
export class ErrorModel implements ErrorDto {
  @Field()
  message: string;
}
