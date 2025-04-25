import { Controller, Get, Query } from '@nestjs/common';
import { SaseApiService } from './sase-api.service';

@Controller('sase-api')
export class SaseApiController {
  constructor(private readonly saseService: SaseApiService) {}

  @Get('chart')
  async getChart(
    @Query('symbol') symbol: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.saseService.getStockPriceBetweenDates(symbol, fromDate, toDate);
  }

  @Get('stock-price')
  async getStockPrice(@Query('symbol') symbol: string) {
    return this.saseService.getStockPrice(symbol);
  }
}
