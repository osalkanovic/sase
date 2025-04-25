/* eslint-disable @typescript-eslint/require-await */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { StockService } from '../../stocks/stocks.service';
import { z } from 'zod';

export const sellStockFactory = (stockService: StockService) =>
  new DynamicStructuredTool({
    name: 'sell_stock',
    description:
      'Use this function when user wants to sell stock. Ask for quantity if you dont have this information. If the user says, for example, that they want to sell for 1000 KM, calculate the quantity based on the price.',
    schema: z.object({
      ticker: z
        .string()
        .describe(
          'Stock symbol. You have this information inside system instructions'
        ),
      price: z
        .number()
        .describe(
          'Price with which user willing to sell stock. Round on 2 decimals. If you dont have this information, ask user for amount'
        ),
      quantity: z
        .number()
        .describe(
          'The quantity that the user wishes to sell of stock. If you dont have this information, ask user for amount'
        ),
    }),
    func: async ({ ticker, price, quantity }) => {
      console.log(`Calling tool sell_stock ${ticker} ${price} ${quantity}`);
      const res = stockService.sellStock(ticker, price, quantity);
      return JSON.stringify(res);
    },
  });
