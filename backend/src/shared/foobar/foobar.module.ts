import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '#entity/retail';
import { FoobarService } from './foobar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [FoobarService],
  exports: [FoobarService],
})
export class FoobarModule {}
