import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import * as mongoose from 'mongoose';

export class FinishedWorkout {
  @Prop()
  workoutId: string;

  @Prop()
  finishedAt: number;

  constructor(workoutId: string) {
    this.workoutId = workoutId;
    this.finishedAt = Date.now();
  }
}

@Schema({ versionKey: false })
export class User extends mongoose.Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  @Expose({ name: 'id' })
  _id: string;

  @Prop()
  name?: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileImage: string;

  @Prop()
  finishedWorkouts: FinishedWorkout[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
