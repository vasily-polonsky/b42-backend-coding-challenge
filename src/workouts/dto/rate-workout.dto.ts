import { IsInt, Max, Min } from 'class-validator';
import { IRateWorkout } from './rate-workout.interface';

export class RateWorkoutDto implements IRateWorkout {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
