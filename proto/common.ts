// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.27.1
// source: proto/common.proto

/* eslint-disable */

export const protobufPackage = "common";

export enum SortDirection {
  ASCENDING = 0,
  DESCENDING = 1,
  UNRECOGNIZED = -1,
}

export enum FilterOperator {
  EQUALS = 0,
  NOT_EQUALS = 1,
  GREATER_THAN = 2,
  LESS_THAN = 3,
  CONTAINS = 4,
  IN = 5,
  UNRECOGNIZED = -1,
}

export interface pPaginationRequest {
  page: number;
  limit: number;
  /** Sorting */
  sortBy: SortOption[];
  /** Filtering */
  filters: FilterOption[];
}

export interface SortOption {
  field: string;
  direction: SortDirection;
}

export interface FilterOption {
  field: string;
  operator: FilterOperator;
  value: string;
}

export const COMMON_PACKAGE_NAME = "common";
