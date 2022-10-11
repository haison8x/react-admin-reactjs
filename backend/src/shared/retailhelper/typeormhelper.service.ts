import { Injectable } from '@nestjs/common';
import { In, Like, MoreThan, MoreThanOrEqual, LessThan, LessThanOrEqual } from 'typeorm';

@Injectable()
export class TypeOrmHelperService {
  public toWhereClause(filter: Record<string, unknown>): Record<string, unknown> {
    const where: Record<string, unknown> = {};
    Object.entries(filter).forEach(([key, value]: [string, unknown]) => {
      if (key === 'id') {
        where['id'] = In(<unknown[]>value);
      } else if (key === 'groups') {
        where['groups'] = Like(`%${value}%`);
      } else if (key.endsWith('_gte')) {
        const column = key.substring(0, key.length - 4);
        where[column] = MoreThanOrEqual(value);
      } else if (key.endsWith('_gt')) {
        const column = key.substring(0, key.length - 3);
        where[column] = MoreThan(value);
      } else if (key.endsWith('_lte')) {
        const column = key.substring(0, key.length - 4);
        where[column] = LessThanOrEqual(value);
      } else if (key.endsWith('_lt')) {
        const column = key.substring(0, key.length - 3);
        where[column] = LessThan(value);
      } else {
        where[key] = value;
      }
    });

    return where;
  }

  public toOrderClause(sort: string[]): Record<string, string> {
    const order: Record<string, string> = {};
    const [sortColumn, direction] = sort;
    order[sortColumn] = direction;
    return order;
  }
}
