import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { ICreateWorkout, IExercise } from './create-workout.interface';

export class Exercise implements IExercise {
  @IsString()
  name: string;

  @IsInt()
  repetitions: number;
}

export class CreateWorkoutDto implements ICreateWorkout {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => Exercise)
  exercises: Exercise[];
}
