import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Basket, Category, Command, Customer, Invoice, Product, Review } from '#entity/retail';
import { JwtAuthGuard } from '../auth/guards';
import { FoobarModule } from '../shared/foobar';
import { RetailHelperModule } from '../shared/retailhelper';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket, Category, Command, Customer, Invoice, Product, Review]),
    RetailHelperModule, // Shared Module
    FoobarModule, // Shared Module
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(providers), {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class RetailModule {}
