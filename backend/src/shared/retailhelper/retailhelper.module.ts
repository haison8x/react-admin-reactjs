import { Module } from '@nestjs/common';

import { RetailResponseService } from './retailresponse.service';
import { TypeOrmHelperService } from './typeormhelper.service';

@Module({
  providers: [TypeOrmHelperService, RetailResponseService],
  exports: [TypeOrmHelperService, RetailResponseService],
})
export class RetailHelperModule {}
