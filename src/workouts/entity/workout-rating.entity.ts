import { Prop } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import * as mongoose from 'mongoose';

export class CountedRate {
  @Prop()
  userId: mongoose.Types.ObjectId;

  @Prop()
  ratedAt: number;

  @Prop()
  value: number;

  constructor(userId: string, value: number) {
    this.userId = new mongoose.Types.ObjectId(userId);
    this.ratedAt = Date.now();
    this.value = value;
  }
}

export class Rating {
  @Prop()
  value: number = 0;

  @Prop()
  ratesCount: number = 0;

  @Prop()
  countedRates: CountedRate[] = [];

  add(rating: number, userId: string): Rating {
    this.value =
      (this.value * this.ratesCount + rating) / (this.ratesCount + 1);
    this.ratesCount += 1;
    this.countedRates.push(new CountedRate(userId, rating));
    return this;
  }

  hasRatedByUser(userId: string) {
    const mongoUserId = mongoose.Types.ObjectId(userId);
    return this.countedRates.some(({ userId: countedUserId }) =>
      countedUserId.equals(mongoUserId),
    );
  }

  static fromPlain(rating: unknown): Rating {
    return rating ? plainToClass(Rating, rating) : new Rating();
  }
}
