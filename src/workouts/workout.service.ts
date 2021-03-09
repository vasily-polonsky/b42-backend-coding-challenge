import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICreateWorkout } from './dto/create-workout.interface';
import { Rating } from './entity/workout-rating.entity';
import { Workout } from './entity/workout.entity';
import { WorkoutStorage } from './workout.storage';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutStorage: WorkoutStorage) {}

  create(createDto: ICreateWorkout): Promise<Workout> {
    return this.workoutStorage.save(createDto);
  }

  async rate(id: string, ratingValue: number, userId: string): Promise<Rating> {
    const workout = await this.workoutStorage.findOne(id);
    if (!workout) {
      throw new NotFoundException(`Workout #${id} not found`);
    }

    const rating = Rating.fromPlain(workout.rating);

    if (rating.hasRatedByUser(userId)) {
      throw new BadRequestException(
        `You have already rated this workout #${id}`,
      );
    }

    rating.add(ratingValue, userId);

    const updatedWorkout = await this.workoutStorage.updateRating(id, rating);
    return updatedWorkout.rating;
  }

  async findOne(id: string): Promise<Workout> {
    const workout = await this.workoutStorage.findOne(id);
    if (!workout) {
      throw new NotFoundException(`Workout #${id} not found`);
    }
    return workout;
  }

  findAll(): Promise<Workout[]> {
    return this.workoutStorage.findAll();
  }
}
