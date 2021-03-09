import { Field, ObjectType } from '@nestjs/graphql';
import { createResponseType } from '../../common/models/create-response-type';

@ObjectType()
export class FinishedWorkoutModel {
  @Field()
  workoutId: string;

  @Field()
  finishedAt: number;
}

export const FinishedWorkoutType = createResponseType(FinishedWorkoutModel);
