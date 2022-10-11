import { IsString } from 'class-validator';

import type { Category } from '#entity/retail';

export class CreateDto implements Omit<Category, 'id'> {
  @IsString()
  public name!: string;
}
