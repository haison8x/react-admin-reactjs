import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Review } from '#entity/retail';
import { RetailQuery, TypeOrmHelperService } from '../../shared/retailhelper';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private table: Repository<Review>,
    private typeormHelperService: TypeOrmHelperService,
  ) {}

  public async create(data: Partial<Review>): Promise<Review> {
    return this.table.save(data);
  }

  public async read(id: number): Promise<Review | null> {
    return this.table.findOneBy({ id });
  }

  public async update(id: number, data: Partial<Review>): Promise<UpdateResult> {
    return this.table.update(id, data);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return this.table.delete(id);
  }

  public async readMany(retailQuery: RetailQuery): Promise<Review[]> {
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
