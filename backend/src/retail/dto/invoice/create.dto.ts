import { IsDate, IsNumber } from 'class-validator';

import type { Invoice } from '#entity/retail';

export class CreateDto implements Omit<Invoice, 'id'> {
  @IsDate()
  public date!: Date;

  @IsNumber()
  public command_id!: number;

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
}
