import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { mongooseConfig } from './mongoose.config';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
  constructor(
    @Inject(mongooseConfig.KEY)
    private mongooseConfigConfiguration: ConfigType<typeof mongooseConfig>,
  ) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb://${this.mongooseConfigConfiguration.host}:${this.mongooseConfigConfiguration.port}/${this.mongooseConfigConfiguration.database}`,
    };
  }
}
