import { Injectable } from '@nestjs/common';
import { buyStockFactory } from '../agent/tools/buy-stock';
import { getCurrentStockPriceToolFactory } from '../agent/tools/get-current-stock-price';
import { getStockPriceToolFactory } from '../agent/tools/get-stock-price';
import { getUserBalanceFactory } from '../agent/tools/get-user-balance';
import { sellStockFactory } from '../agent/tools/sell-stock';
import { SaseApiService } from '../sase-api/sase-api.service';
import { StockService } from '../stocks/stocks.service';
import { callAssistantFactory } from '../agent/tools/call-assistant';
import { AppConfigService } from '../config/config.service';
import { getStockNews } from '../agent/tools/get-news';
import { NewsService } from '../news/news.service';

@Injectable()
export class LangchainToolProvider {
  constructor(
    private readonly saseApiService: SaseApiService,
    private readonly stockService: StockService,
    private readonly appConfigService: AppConfigService,
    private readonly newsService: NewsService
  ) {}

  getStockPricesTool() {
    return getStockPriceToolFactory(this.saseApiService);
  }

  getBuyStockTool() {
    return buyStockFactory(this.stockService);
  }

  getSellStockTool() {
    return sellStockFactory(this.stockService);
  }

  getCurrentStockPriceTool() {
    return getCurrentStockPriceToolFactory(this.saseApiService);
  }

  getUserBalance() {
    return getUserBalanceFactory(this.stockService);
  }

  getCallAssistant() {
    return callAssistantFactory(this.appConfigService, this.getStockTools());
  }

  getNews() {
    return getStockNews(this.newsService);
  }
  getUserTools() {
    return [
      this.getBuyStockTool(),
      this.getSellStockTool(),
      this.getUserBalance(),
      this.getCallAssistant(),
      this.getNews(),
    ];
  }
  getStockTools() {
    return [this.getStockPricesTool(), this.getCurrentStockPriceTool()];
  }
}
