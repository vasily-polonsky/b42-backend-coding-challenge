import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isInt } from 'class-validator';
import { Model } from 'mongoose';
import { ICreateWorkout } from './dto/create-workout.interface';
import { Rating } from './entity/workout-rating.entity';
import { Workout } from './entity/workout.entity';

@Injectable()
export class WorkoutStorage {
  constructor(
    @InjectModel(Workout.name) private readonly workoutModel: Model<Workout>,
  ) {}

  private async generateHumanReadableId(name: string): Promise<string> {
    let id = name.trim().replace(/ /g, '-');
    let isIdTaken = true;
    while (isIdTaken) {
      const workout = await this.findOne(id);
      if (workout) {
        const idSplitted = id.split('-');
        const postFix = idSplitted.pop();
        const newPostFix = isInt(Number(postFix))
          ? String(Number(postFix) + 1)
          : `${postFix}-1`;
        id = [...idSplitted, newPostFix].join('-');
        continue;
      }
      isIdTaken = false;
    }
    return id;
  }

  async findOne(id: string): Promise<Workout> {
    return this.workoutModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutModel.find({}).exec();
  }

  async save(createDto: ICreateWorkout): Promise<Workout> {
    const workout = new this.workoutModel({
      _id: await this.generateHumanReadableId(createDto.name),
      ...createDto,
    });
    return workout.save();
  }

  async updateRating(id: string, rating: Rating): Promise<Workout> {
    return this.workoutModel
      .findOneAndUpdate({ _id: id }, { $set: { rating } }, { new: true })
      .exec();
  }
}
