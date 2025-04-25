/* eslint-disable @typescript-eslint/require-await */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { SaseApiService } from '../../sase-api/sase-api.service';
import { z } from 'zod';

export const getStockPriceToolFactory = (saseApiService: SaseApiService) =>
  new DynamicStructuredTool({
    name: 'get_stock_price',
    description:
      'Retrieve the stock price for a given ticker symbol between two dates. Usefull for price recommendation. Use code code_interpreter',
    schema: z.object({
      ticker: z
        .string()
        .describe(
          'Stock symbol. You have this information inside system instructions'
        ),
      fromDate: z
        .string()
        .describe('From date. Use code interpreter to calculate correct date'),
      toDate: z
        .string()
        .describe('To date. Use code interpreter to calculate correct date'),
    }),
    func: async ({ ticker, fromDate, toDate }) => {
      console.log(
        `Calling tool getStockPriceTool: ${ticker} ${fromDate} ${toDate}`
      );
      const res = await saseApiService.getStockPriceBetweenDates(
        ticker,
        fromDate,
        toDate
      );
      return JSON.stringify(res[0]);
    },
  });
