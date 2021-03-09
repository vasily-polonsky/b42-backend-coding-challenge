import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { WorkoutService } from './workout.service';
import { WorkoutStorage } from './workout.storage';

type MockStorage<T = any> = Partial<Record<keyof WorkoutStorage, jest.Mock>>;
const createMockStorage = <T = any>(): MockStorage<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  updateRating: jest.fn(),
});

describe.only('WorkoutService', () => {
  let service: WorkoutService;
  let workoutStorage: MockStorage;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutService,
        {
          provide: WorkoutStorage.name,
          useValue: createMockStorage(),
        },
      ],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
    workoutStorage = module.get<MockStorage>(WorkoutStorage.name);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('rate', () => {
    describe('when workout with ID exists', () => {
      it('should update rating', async () => {
        const userId = '60472649519b75a7f60f4a76';
        const votedRating = 1;
        const existedWorkout = {
          _id: 'Cristiano',
          name: 'Cristiano',
          exercises: [
            {
              name: 'press',
              repetitions: 6,
            },
          ],
          rating: {
            value: 5,
            ratesCount: 3,
          },
        };

        const updatedWorkout = {
          rating: {
            value: 4,
            ratesCount: 4,
          },
        };

        const expectedRating = {
          value: 4,
          ratesCount: 4,
        };

        workoutStorage.findOne.mockReturnValue(existedWorkout);
        workoutStorage.updateRating.mockReturnValue(updatedWorkout);

        const rating = await service.rate('Cristiano', votedRating, userId);
        expect(rating).toEqual(expectedRating);
        expect(workoutStorage.findOne).toBeCalledTimes(1);
        expect(workoutStorage.findOne).toHaveBeenCalledWith('Cristiano');
        expect(workoutStorage.updateRating).toBeCalledTimes(1);
        expect(workoutStorage.updateRating.mock.calls[0]).toMatchObject([
          'Cristiano',
          {
            ...expectedRating,
            countedRates: [
              {
                ratedAt: expect.any(Number),
                userId: new mongoose.Types.ObjectId('60472649519b75a7f60f4a76'),
                value: 1,
              },
            ],
          },
        ]);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const userId = '60472649519b75a7f60f4a76';
        const votedRating = 1;

        workoutStorage.findOne.mockReturnValue(undefined);
        workoutStorage.updateRating.mockReturnValue(undefined);
        try {
          await service.rate('Cristiano', votedRating, userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual('Workout #Cristiano not found');
          expect(workoutStorage.findOne).toBeCalledTimes(1);
          expect(workoutStorage.updateRating).toBeCalledTimes(0);
        }
      });
    });
  });
});
