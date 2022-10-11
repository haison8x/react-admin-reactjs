import { IsOptional, IsString, IsEmail, IsDate, IsBoolean, IsNumber } from 'class-validator';

import type { Customer } from '#entity/retail';

export class CreateDto implements Omit<Customer, 'id'> {
  @IsString()
  public title!: string;

  @IsString()
  public first_name!: string;

  @IsString()
  public last_name!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  public address!: string;

  @IsString()
  public zipcode!: string;

  @IsString()
  public city!: string;

  @IsString()
  public stateAbbr!: string;

  @IsString()
  public avatar!: string;

  @IsDate()
  public birthday!: Date;

  @IsOptional()
  @IsDate()
  public first_seen!: Date;

  @IsOptional()
  @IsDate()
  public last_seen!: Date;

  @IsBoolean()
  public has_ordered!: boolean;

  @IsOptional()
  public latest_purchase!: Date;

  @IsBoolean()
  public has_newsletter!: boolean;

  @IsString({ each: true })
  public groups?: string[];

  @IsNumber()
  public nb_commands!: number;

  @IsNumber()
  public total_spent!: number;
}
