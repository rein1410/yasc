import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  FilterOperator,
  FilterOption as pFilterOption,
  pPaginationRequest,
  SortOption as pSortOption,
  SortDirection,
} from 'proto/common';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class SortOption implements pSortOption {
  @ApiProperty()
  field: string;

  @ApiProperty({ enum: SortDirection })
  direction: SortDirection;
}

class FilterOption implements pFilterOption {
  @ApiProperty()
  field: string;

  @ApiProperty({ enum: FilterOperator })
  operator: FilterOperator;

  @ApiProperty()
  value: string;
}

export class PaginationDto implements pPaginationRequest {
  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional({
    type: SortOption,
    isArray: true,
    description: '0 for ASC, 1 for DESC',
  })
  sortBy: SortOption[];

  @ApiPropertyOptional({
    type: FilterOption,
    isArray: true,
    description:
      '0 for EQUALS, 1 for NOT_EQUALS, 2 for GREATER_THAN, 3 for LESS_THAN, 4 for GREATER_THAN_OR_EQUAL, 5 for LESS_THAN_OR_EQUAL, 6 for IN, 7 for NOT_IN, 8 for BETWEEN, 9 for NOT_BETWEEN, 10 for LIKE, 11 for NOT_LIKE, 12 for ILIKE, 13 for NOT_ILIKE',
  })
  filters: FilterOption[];
}
