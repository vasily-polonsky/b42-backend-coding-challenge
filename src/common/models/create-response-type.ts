import { createUnionType } from '@nestjs/graphql';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ErrorDto, ErrorModel } from './error.model';

export const createResponseType = <T>(model: ClassType<T>): T | ErrorModel =>
  createUnionType({
    name: model.name.replace('Model', 'Type'),
    types: () => [model, ErrorModel],
    resolveType(value: unknown | ErrorDto) {
      if (value instanceof Object && value['message']) {
        return ErrorModel;
      }
      return model;
    },
  });
