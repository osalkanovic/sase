/* eslint-disable @typescript-eslint/require-await */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { SaseApiService } from '../../sase-api/sase-api.service';
import { z } from 'zod';

export const getCurrentStockPriceToolFactory = (
  saseApiService: SaseApiService
) =>
  new DynamicStructuredTool({
    name: 'get_current_stock_price',
    description: 'Retrieve the current stock price for a given ticker symbol.',
    schema: z.object({
      ticker: z
        .string()
        .describe(
          'Stock symbol. You have this information inside system instructions'
        ),
    }),
    func: async ({ ticker }) => {
      console.log(`Calling tool get_current_stock_price: ${ticker}`);
      const res = await saseApiService.getStockPrice(ticker);
      return res;
    },
  });
