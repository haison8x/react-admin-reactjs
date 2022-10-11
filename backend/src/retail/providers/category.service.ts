import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Category } from '#entity/retail';
import { RetailQuery, TypeOrmHelperService } from '../../shared/retailhelper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private table: Repository<Category>,
    private typeormHelperService: TypeOrmHelperService,
  ) {}

  public async create(data: Partial<Category>): Promise<Category> {
    return this.table.save(data);
  }

  public async read(id: number): Promise<Category | null> {
    return this.table.findOneBy({ id });
  }

  public async update(id: number, data: Partial<Category>): Promise<UpdateResult> {
    return this.table.update(id, data);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return this.table.delete(id);
  }

  public async readMany(retailQuery: RetailQuery): Promise<Category[]> {
    const where = this.typeormHelperService.toWhereClause(retailQuery.filter);
    const order = this.typeormHelperService.toOrderClause(retailQuery.sort);

    return this.table.find({
      where,
      order,
      skip: retailQuery.range[0],
      take: retailQuery.range[1] - retailQuery.range[0] + 1,
      cache: true,
    });
  }

  public async readCount(retailQuery: RetailQuery): Promise<number> {
    const where = this.typeormHelperService.toWhereClause(retailQuery.filter);
    const order = this.typeormHelperService.toOrderClause(retailQuery.sort);

    return this.table.count({
      where,
      order,
      cache: true,
    });
  }
}
