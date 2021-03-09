import { UseFilters, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { UserInputExceptionFilter } from '../common/filters/user-input-exception.filter';
import { JwtGraphqlGuard } from '../common/jwt/jwt-graphql.guard';
import { ITokenPayload } from '../common/jwt/jwt.strategy';
import { TokenPayload } from '../common/parameters/token-payload-graphql.parameter';
import { User } from '../users/entity/user.entity';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { RateWorkoutInput } from './dto/rate-workout.input';
import { Rating } from './entity/workout-rating.entity';
import { Workout } from './entity/workout.entity';
import { RatingType } from './models/rating.model';
import { WorkoutModel, WorkoutType } from './models/workout.model';
import { WorkoutService } from './workout.service';

@UseFilters(new AllExceptionsFilter(), new UserInputExceptionFilter())
@Resolver(of => UserModel)
export class WorkoutResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly workoutService: WorkoutService,
  ) {}

  @Query(() => [WorkoutModel])
  async workouts(): Promise<Workout[]> {
    return this.workoutService.findAll();
  }

  @Mutation(() => WorkoutType)
  createWorkout(
    @Args('data') createWorkoutInput: CreateWorkoutInput,
  ): Promise<Workout> {
    return this.workoutService.create(createWorkoutInput);
  }

  @ResolveField('finishedWorkouts', () => [WorkoutModel])
  async findPersonages(@Parent() user: User): Promise<Workout[]> {
    const workouts = await this.workoutService.findAll();
    return user.finishedWorkouts.map(({ workoutId }) =>
      workouts.find(({ id }) => id === workoutId),
    );
  }

  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => RatingType)
  rateWorkout(
    @Args('data') rateWorkoutInput: RateWorkoutInput,
    @TokenPayload() { userId }: ITokenPayload,
  ): Promise<Rating> {
    return this.workoutService.rate(
      rateWorkoutInput.id,
      rateWorkoutInput.rating,
      userId,
    );
  }

  @UseGuards(JwtGraphqlGuard)
  @Mutation(() => WorkoutType)
  async finishWorkout(
    @Args('id', { type: () => String }) id: string,
    @TokenPayload() { userId }: ITokenPayload,
  ): Promise<Workout> {
    const workout = await this.workoutService.findOne(id);
    await this.usersService.finishWorkout(userId, id);
    return workout;
  }
}
