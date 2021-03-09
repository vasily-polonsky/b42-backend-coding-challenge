import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { IRateWorkout } from './rate-workout.interface';

@InputType()
export class RateWorkoutInput implements IRateWorkout {
  @Field()
  id: string;

  @Min(1)
  @Max(5)
  @Field(() => Int)
  rating: number;
}
