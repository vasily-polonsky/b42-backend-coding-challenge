import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { ICreateUser } from './dto/create-user.interface';
import { FinishedWorkout, User } from './entity/user.entity';
import { UsersStorage } from './users.storage';

@Injectable()
export class UsersService {
  constructor(private readonly userStorage: UsersStorage) {}

  async create(createDto: ICreateUser): Promise<User> {
    try {
      return await this.userStorage.save(createDto);
    } catch (e) {
      if (e instanceof MongoError && e.code === 11000) {
        throw new BadRequestException(
          `Email ${createDto.email} is already taken`,
        );
      }
      throw e;
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userStorage.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async finishWorkout(id: string, workoutId: string): Promise<void> {
    await this.userStorage.finishWorkout(id, new FinishedWorkout(workoutId));
  }
}
