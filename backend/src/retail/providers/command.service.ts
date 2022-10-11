import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Command, Basket } from '#entity/retail';
import { RetailQuery, TypeOrmHelperService } from '../../shared/retailhelper';
import type { ReadDto } from '../dto/command';

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private table: Repository<Command>,
    @InjectRepository(Basket)
    private basketTable: Repository<Basket>,
    private typeormHelperService: TypeOrmHelperService,
  ) {}

  public async create(data: Partial<Command>): Promise<Command> {
    return this.table.save(data);
  }

  public async read(id: number): Promise<ReadDto | null> {
    const command = await this.table.findOneBy({ id });
    const baskets = await this.basketTable.findBy({ command_id: id });
    const readDto: ReadDto = <ReadDto>{ ...command, basket: baskets };

    return Promise.resolve(readDto);
  }

  public async update(id: number, data: Partial<Command>): Promise<UpdateResult> {
    return this.table.update(id, data);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return this.table.delete(id);
  }

  public async readMany(retailQuery: RetailQuery): Promise<ReadDto[]> {
    const commands = await this.readCommands(retailQuery);
    const readDtos = commands.map(async (c: Command): Promise<ReadDto> => {
      const baskets = await this.basketTable.findBy({ command_id: c.id });
      const readDto: ReadDto = <ReadDto>{ ...c, basket: baskets };

      return readDto;
    });

    return Promise.all(readDtos);
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

  private async readCommands(retailQuery: RetailQuery): Promise<Command[]> {
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
}
