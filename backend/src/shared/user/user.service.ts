import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '#entity/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private table: Repository<User>,
  ) {}

  public async fetch(username: string): Promise<User | null> {
    return this.table.findOneBy({ username });
  }
}
