import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorModel } from './error.model';

@ObjectType()
export class ErrorsModel {
  @Field(() => ErrorModel)
  errors: ErrorModel[];
}
