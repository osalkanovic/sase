/* eslint-disable @typescript-eslint/require-await */
import { DynamicTool } from '@langchain/core/tools';
import { StockService } from '../../stocks/stocks.service';
import { NewsService } from '../../news/news.service';

export const getStockNews = (newsService: NewsService) =>
  new DynamicTool({
    name: 'get_stock_news',
    description: 'Get news related to stocks',

    func: async () => {
      console.log(`get_stock_news `);
      const res = newsService.news;
      console.log(res);
      return JSON.stringify(res);
    },
  });
