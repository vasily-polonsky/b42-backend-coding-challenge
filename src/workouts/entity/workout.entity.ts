import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Exercise } from './workout-exercise.entity';
import { Rating } from './workout-rating.entity';

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Workout extends mongoose.Document {
  @Prop({ type: String })
  @ApiProperty({ name: 'id' })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  exercises: Exercise[];

  @Prop()
  rating: Rating;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
