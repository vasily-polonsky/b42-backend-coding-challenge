import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { UserInputExceptionFilter } from '../common/filters/user-input-exception.filter';
import { JwtGraphqlGuard } from '../common/jwt/jwt-graphql.guard';
import { ITokenPayload } from '../common/jwt/jwt.strategy';
import { TokenPayload } from '../common/parameters/token-payload-graphql.parameter';
import { UsersService } from '../users/users.service';
import { AccessResponseDto } from './dto/access-response.dto';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entity/user.entity';
import { TokenType } from './models/token.model';
import { UserType } from './models/user.model';

@UseFilters(new AllExceptionsFilter(), new UserInputExceptionFilter())
@Resolver()
export class UsersResolver {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // private readonly workoutService: WorkoutService,
  ) {}

  @UseGuards(JwtGraphqlGuard)
  @Query(() => UserType)
  async user(@TokenPayload() { userId }: ITokenPayload): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Mutation(() => TokenType)
  async createUser(
    @Args('data') createUserInput: CreateUserInput,
  ): Promise<AccessResponseDto> {
    const user = await this.usersService.create(createUserInput);
    const payload = { userId: user.id };
    return new AccessResponseDto(this.jwtService.sign(payload));
  }
}
