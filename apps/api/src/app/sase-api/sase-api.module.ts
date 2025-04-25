import { Module } from '@nestjs/common';
import { SaseApiService } from './sase-api.service';
import { SaseApiController } from './sase-api.controller';

@Module({
  providers: [SaseApiService],
  exports: [SaseApiService],
  controllers: [SaseApiController],
})
export class SaseApiModule {}
