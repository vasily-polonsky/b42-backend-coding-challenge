import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateUser } from './dto/create-user.interface';
import { FinishedWorkout, User } from './entity/user.entity';

@Injectable()
export class UsersStorage {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async save(createDto: ICreateUser): Promise<User> {
    const user = new this.userModel(createDto);
    return await user.save();
  }

  async finishWorkout(
    id: string,
    finishedWorkout: FinishedWorkout,
  ): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $addToSet: { finishedWorkouts: finishedWorkout } },
      )
      .exec();
    return user;
  }
}
