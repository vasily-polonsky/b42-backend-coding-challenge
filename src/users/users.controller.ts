import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { JwtRestGuard } from '../common/jwt/jwt-rest.guard';
import { ITokenPayload } from '../common/jwt/jwt.strategy';
import { TokenPayload } from '../common/parameters/token-payload-rest.parameter';
import { AccessResponseDto } from './dto/access-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<AccessResponseDto> {
    const user = await this.usersService.create(createDto);
    const payload = { userId: user.id };
    return new AccessResponseDto(this.jwtService.sign(payload));
  }

  @UseGuards(JwtRestGuard)
  @Get()
  async find(@TokenPayload() { userId }: ITokenPayload): Promise<User> {
    return this.usersService.findOne(userId);
  }
}
