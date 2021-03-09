import { Field, Int, ObjectType } from '@nestjs/graphql';
import { createResponseType } from '../../common/models/create-response-type';
import { RatingModel } from './rating.model';

@ObjectType()
export class Exercise {
  @Field()
  name: string;

  @Field(() => Int)
  repetitions: number;
}

@ObjectType()
export class WorkoutModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [Exercise])
  exercises: Exercise[];

  @Field({ nullable: true })
  rating?: RatingModel;
}

export const WorkoutType = createResponseType(WorkoutModel);
