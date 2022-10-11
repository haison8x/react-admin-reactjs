import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '#entity/retail';

@Injectable()
export class FoobarService {
  constructor(
    @InjectRepository(Category)
    private categoryTable: Repository<Category>,
  ) {}

  public async getFoobars(): Promise<Category[]> {
    return this.categoryTable.find({ take: 10 });
  }
}
