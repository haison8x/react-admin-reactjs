import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

import type { Command } from '#entity/retail';

export class CreateDto implements Omit<Command, 'id'> {
  @IsString()
  public reference!: string;

  @IsDate()
  public date!: Date;

  @IsNumber()
  public customer_id!: number;

  @IsNumber()
  public total_ex_taxes!: number;

  @IsNumber()
  public delivery_fees!: number;

  @IsNumber()
  public tax_rate!: number;

  @IsNumber()
  public taxes!: number;

  @IsNumber()
  public total!: number;

  @IsString()
  public status!: string;

  @IsBoolean()
  public returned!: boolean;
}
