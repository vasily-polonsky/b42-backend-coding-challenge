import { JwtService } from '@nestjs/jwt/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessResponseDto } from './dto/access-response.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

type MockService<T> = Partial<Record<keyof T, jest.Mock>>;

const createMockUserService = (): MockService<UsersService> => ({
  create: jest.fn(),
});

const createMockJwtService = (): MockService<JwtService> => ({
  sign: jest.fn(),
});

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: MockService<UsersService>;
  let jwtService: MockService<JwtService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMockUserService(),
        },
        {
          provide: JwtService,
          useValue: createMockJwtService(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    describe('when receive DTO', () => {
      it('should returns access_token in response', async () => {
        const userId = 'c5719c26-cc97-458e-8547-5c40859c3296';
        const dto = {
          name: 'Peter',
          password: 'sdf',
          email: 'some@email.com',
        };
        const expectedResponse = { access_token: 'Bearer token' };

        usersService.create.mockReturnValue({ ...dto, id: userId });
        jwtService.sign.mockReturnValue('Bearer token');

        const response = await controller.create(dto);
        expect(response).toBeInstanceOf(AccessResponseDto);
        expect(response).toEqual(expectedResponse);
        expect(usersService.create).toBeCalledTimes(1);
        expect(jwtService.sign).toBeCalledTimes(1);
      });
    });
  });
});
