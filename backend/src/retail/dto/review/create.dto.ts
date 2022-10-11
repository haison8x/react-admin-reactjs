import { IsString, IsDate, IsNumber } from 'class-validator';

import type { Review } from '#entity/retail';

export class CreateDto implements Omit<Review, 'id'> {
  @IsDate()
  public date!: Date;

  @IsString()
  public status!: string;

  @IsNumber()
  public command_id!: number;

  @IsNumber()
  public product_id!: number;

  @IsNumber()
  public customer_id!: number;

  @IsNumber()
  public rating!: number;

  @IsString()
  public comment!: string;
}
