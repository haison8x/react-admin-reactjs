import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import type { Command } from '#entity/retail';
import { RetailQuery, RetailIdListQuery } from '../../common';
import { RetailQuery as RetailQueryType, RetailResponseService } from '../../shared/retailhelper';
import { CreateDto, UpdateDto } from '../dto/command';
import { CommandService } from '../providers';

/**
 * route /api/commands/*
 */
@Controller('commands')
export class CommandController {
  constructor(private service: CommandService, private responseService: RetailResponseService) {}

  @Get('') // http://localhost:3000/api/commands?filter={"has_ordered":true}&range=[0,99]&sort=["first_seen","DESC"]
  public async readAll(@RetailQuery() retailQuery: RetailQueryType, @Res() res: Response): Promise<void> {
    const count = await this.service.readCount(retailQuery);
    const commands = await this.service.readMany(retailQuery);
    this.responseService.includeContentRange(res, 'commands', retailQuery.range, count);

    res.status(200).json(commands);
  }

  @Get(':id') // GET http://localhost:3000/api/commands/:id
  public async read(@Param('id', ParseIntPipe) id: number): Promise<Command> {
    const result = await this.service.read(id);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }

    return result;
  }

  @Post() // POST http://localhost:3000/api/commands
  public async create(@Body() body: CreateDto): Promise<{ id: number }> {
    const result = await this.service.create(body);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { id: result.id };
  }

  @Put(':id') // PUT http://localhost:3000/api/commands/:id
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDto): Promise<{ success: boolean }> {
    const result = await this.service.update(id, body);

    return { success: !!result.affected };
  }

  @Put() // PUT http://localhost:3000/api/commands/:id
  public async updateMany(@RetailIdListQuery() ids: number[], @Body() body: UpdateDto): Promise<{ success: boolean }> {
    for (const id of ids) {
      await this.service.update(id, body);
    }

    return { success: true };
  }

  @Delete(':id') // DELETE http://localhost:3000/api/commands/:id
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    const result = await this.service.remove(id);

    return { success: !!result.affected };
  }

  @Delete() // DELETE http://localhost:3000/api/commands/:id
  public async removeMany(@RetailIdListQuery() ids: number[]): Promise<{ success: boolean }> {
    for (const id of ids) {
      await this.service.remove(id);
    }

    return { success: true };
  }
}
