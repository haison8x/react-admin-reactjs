import type { Command, Basket } from '#entity/retail';

export class ReadDto implements Command {
  public id!:number;

  public reference!: string;

  public date!: Date;

  public customer_id!: number;

  public total_ex_taxes!: number;

  public delivery_fees!: number;

  public tax_rate!: number;

  public taxes!: number;

  public total!: number;

  public status!: string;

  public returned!: boolean;

  public basket!: Basket[];
}
