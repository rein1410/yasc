import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import {
  FilterOperator,
  FilterOption,
  pPaginationRequest,
  SortDirection,
  SortOption,
} from 'proto/common';

@Injectable()
export class PaginationService {
  constructor() {}

  private transformFilters(filters: FilterOption[]) {
    if (!filters || filters.length === 0) {
      return undefined;
    }
    return filters.reduce((acc, filter) => {
      const { field, operator, value } = filter;
      switch (operator) {
        case FilterOperator.EQUALS:
          acc[field] = value;
          break;
        case FilterOperator.NOT_EQUALS:
          acc[field] = { $ne: value };
          break;
        case FilterOperator.GREATER_THAN:
          acc[field] = { $gt: value };
          break;
        case FilterOperator.LESS_THAN:
          acc[field] = { $lt: value };
          break;
        case FilterOperator.CONTAINS:
          acc[field] = { $regex: new RegExp(value, 'i') };
          break;
        case FilterOperator.IN:
          acc[field] = { $in: value.split(',') };
          break;
      }
      return acc;
    }, {});
  }

  private transformSort(sortBy: SortOption[]) {
    if (!sortBy || sortBy.length === 0) {
      return undefined;
    }
    return sortBy.reduce((acc, sort) => {
      const { field, direction } = sort;
      acc[field] = direction === SortDirection.ASCENDING ? 1 : -1;
      return acc;
    }, {});
  }
  async findAllAndCount<T>(
    model: Model<T>,
    request: pPaginationRequest
  ): Promise<{ data: T[]; total: number, page: number, limit: number }> {
    let { limit, page, filters, sortBy } = request;
    limit = limit || 10;
    page = page || 1;

    const [data, total] = await Promise.all([
      model
      .find(this.transformFilters(filters))
      .sort(this.transformSort(sortBy))
      .limit(limit)
      .skip((page - 1) * limit)
      .exec(),
      model.countDocuments().exec(),
    ]);

    return {
      data,
      total,
      page,
      limit
    };
  }
}
