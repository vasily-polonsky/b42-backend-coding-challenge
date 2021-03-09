import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { mongooseConfig } from './mongoose/mongoose.config';
import { MongooseService } from './mongoose/mongoose.service';
import { UsersModule } from './users/users.module';
import { WorkoutModule } from './workouts/workout.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongooseConfig)],
      useClass: MongooseService,
    }),
    UsersModule,
    WorkoutModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
