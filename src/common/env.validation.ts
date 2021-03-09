import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validateSync } from 'class-validator';

export function envValidate<T>(
  config: Record<string, unknown>,
  classType: ClassType<T>,
): T {
  const validatedConfig = plainToClass(classType, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
