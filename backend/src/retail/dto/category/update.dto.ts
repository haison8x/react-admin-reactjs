/**
 * https://github.com/nestjs/mapped-types
 * https://docs.nestjs.com/openapi/mapped-types for swagger
 */
import { IsNumber } from 'class-validator';

import { CreateDto } from './create.dto';
/**
 * Mapped Types: PartialType, PickType, OmitType, IntersectionType
 */
export class UpdateDto extends CreateDto {
  @IsNumber()
  public id!: number;
}
