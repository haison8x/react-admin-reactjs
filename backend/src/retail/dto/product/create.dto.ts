import { IsString, IsNumber } from 'class-validator';

import type { Product } from '#entity/retail';

export class CreateDto implements Omit<Product, 'id'> {
  @IsNumber()
  public category_id!: number;

  @IsString()
  public reference!: string;

  @IsNumber()
  public width!: number;

  @IsNumber()
  public height!: number;

  @IsNumber()
  public price!: number;

  @IsString()
  public thumbnail!: string;

  @IsString()
  public image!: string;

  @IsString()
  public description!: string;

  @IsNumber()
  public stock!: number;

  @IsNumber()
  public sales!: number;
}
