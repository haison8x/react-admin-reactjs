import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

function safeJsonParse(value: string): [unknown, unknown] {
  try {
    return [JSON.parse(value), null];
  } catch (err) {
    return [null, err];
  }
}

function toFilter(value: string): Record<string, unknown> {
  const [result, error] = safeJsonParse(value);
  return !error && result ? <Record<string, unknown>>result : {};
}

function toRange(value: string): number[] {
  const [result, error] = safeJsonParse(value);
  return !error && result ? <number[]>result : [0, 99];
}

function toSort(value: string): string[] {
  const [result, error] = safeJsonParse(value);
  return !error && result ? <string[]>result : ['id', 'ASC'];
}

export const RetailQuery = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();
  const { filter, sort, range } = request.query || {};
  return {
    filter: toFilter(String(filter)),
    range: toRange(String(range)),
    sort: toSort(String(sort)),
  };
});

export const RetailIdListQuery = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();
  const { filter } = request.query || {};
  const filterDictionary = toFilter(String(filter));
  const ids = filterDictionary['ids'] ? <string[]>filterDictionary['ids'] : [];

  return ids.map((id: string) => parseInt(id, 10));
});
