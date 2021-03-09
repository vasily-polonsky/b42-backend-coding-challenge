import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { ICreateWorkout, IExercise } from './create-workout.interface';

@InputType()
export class ExerciseInput implements IExercise {
  @Field()
  name: string;

  @Field(() => Int)
  repetitions: number;
}

@InputType()
export class CreateWorkoutInput implements ICreateWorkout {
  @Field()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ExerciseInput)
  @IsOptional()
  @IsArray()
  @Field(() => [ExerciseInput])
  exercises: ExerciseInput[];
}
