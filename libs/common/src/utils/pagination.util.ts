import { ClassConstructor, plainToInstance } from 'class-transformer';

export const paginate = <T>(
  cls: ClassConstructor<T>,
  items: T[],
  req: { limit: number; skip: number },
) => {
  return {
    data: plainToInstance(cls, items),
    total: items.length,
    skip: req.skip,
    limit: req.limit,
  };
};
