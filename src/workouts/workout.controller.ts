import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtRestGuard } from '../common/jwt/jwt-rest.guard';
import { ITokenPayload } from '../common/jwt/jwt.strategy';
import { TokenPayload } from '../common/parameters/token-payload-rest.parameter';
import { UsersService } from '../users/users.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { RateWorkoutDto } from './dto/rate-workout.dto';
import { Rating } from './entity/workout-rating.entity';
import { Workout } from './entity/workout.entity';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createDto: CreateWorkoutDto): Promise<Workout> {
    return this.workoutService.create(createDto);
  }

  @Get()
  async findAll(): Promise<Workout[]> {
    return this.workoutService.findAll();
  }

  @UseGuards(JwtRestGuard)
  @Post(':id/rate')
  async rate(
    @Param('id') id: string,
    @Body() rateWorkoutDto: RateWorkoutDto,
    @TokenPayload() payload: ITokenPayload,
  ): Promise<Rating> {
    return this.workoutService.rate(id, rateWorkoutDto.rating, payload.userId);
  }

  @UseGuards(JwtRestGuard)
  @Post(':id/finish')
  async finish(
    @Param('id') id: string,
    @TokenPayload() payload: ITokenPayload,
  ): Promise<void> {
    await this.workoutService.findOne(id);
    await this.usersService.finishWorkout(payload.userId, id);
  }
}
