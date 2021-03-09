import { Field, Int, ObjectType } from '@nestjs/graphql';
import { createResponseType } from '../../common/models/create-response-type';

@ObjectType()
export class RatingModel {
  @Field()
  value: number;

  @Field(() => Int)
  ratesCount: number;
}
export const RatingType = createResponseType(RatingModel);
