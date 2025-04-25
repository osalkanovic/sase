/* eslint-disable @typescript-eslint/require-await */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { StockService } from '../../stocks/stocks.service';
import { z } from 'zod';

export const buyStockFactory = (stockService: StockService) =>
  new DynamicStructuredTool({
    name: 'buy_stock',
    description:
      'Use this function when user wants to buy stock. Ask for quantity if you dont have this information. If the user says, for example, that they want to buy for 1000 KM, calculate the quantity based on the price.',
    schema: z.object({
      ticker: z
        .string()
        .describe(
          'Stock symbol. You have this information inside system instructions'
        ),
      price: z
        .number()
        .describe(
          'Price with which user willing to buy stock. Round on 2 decimals'
        ),
      quantity: z
        .number()
        .describe(
          'The quantity that the user wishes to buy of stock. If you dont have this information, ask user for amount'
        ),
    }),
    func: async ({ ticker, price, quantity }) => {
      console.log(`Calling tool buy_stock ${ticker} ${price} ${quantity}`);
      const res = stockService.buyStocks(ticker, price, quantity);
      return JSON.stringify(res);
    },
  });
