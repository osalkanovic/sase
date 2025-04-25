import { Module } from '@nestjs/common';
import { StockService } from './stocks.service';
import { SaseApiModule } from '../sase-api/sase-api.module';

@Module({
  imports: [SaseApiModule],
  providers: [StockService],
  exports: [StockService],
})
export class StocksModule {}
