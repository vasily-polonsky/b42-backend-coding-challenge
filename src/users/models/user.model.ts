import { Field, ObjectType } from '@nestjs/graphql';
import { createResponseType } from '../../common/models/create-response-type';
import { FinishedWorkoutModel } from './user-finished-workout.model';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  profileImage: string;

  @Field(() => [FinishedWorkoutModel])
  finishedWorkouts: FinishedWorkoutModel[];
}

export const UserType = createResponseType(UserModel);
