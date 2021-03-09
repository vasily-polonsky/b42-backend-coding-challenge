import { Prop } from '@nestjs/mongoose';

export class Exercise {
  @Prop()
  name: string;

  @Prop()
  repetitions: number;
}
