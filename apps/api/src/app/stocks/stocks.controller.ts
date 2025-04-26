import { Controller, Get } from '@nestjs/common';
import { StockService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StockService) {}

  @Get('/user-balance')
  async getUserBalance() {
    return this.stocksService.getUserBalanceWithAdditionalInfo();
  }

  @Get('/history')
  async getHistory() {
    return this.stocksService.history;
  }
}
