import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Workout, WorkoutSchema } from './entity/workout.entity';
import { WorkoutController } from './workout.controller';
import { WorkoutResolver } from './workout.resolver';
import { WorkoutService } from './workout.service';
import { WorkoutStorage } from './workout.storage';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Workout.name,
        schema: WorkoutSchema,
      },
    ]),
  ],
  providers: [WorkoutService, WorkoutStorage, WorkoutResolver],
  controllers: [WorkoutController],
  exports: [WorkoutService, WorkoutStorage],
})
export class WorkoutModule {}
