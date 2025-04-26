import { Module } from '@nestjs/common';
import { StockService } from './stocks.service';
import { SaseApiModule } from '../sase-api/sase-api.module';
import { StocksController } from './stocks.controller';

@Module({
  imports: [SaseApiModule],
  controllers: [StocksController],
  providers: [StockService],
  exports: [StockService],
})
export class StocksModule {}
