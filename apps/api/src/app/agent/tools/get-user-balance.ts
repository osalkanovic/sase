/* eslint-disable @typescript-eslint/require-await */
import { DynamicTool } from '@langchain/core/tools';
import { StockService } from '../../stocks/stocks.service';

export const getUserBalanceFactory = (stockService: StockService) =>
  new DynamicTool({
    name: 'get_user_balance',
    description:
      'Use this function to get user balance, also this function will return how much stocks user holds. Use function get_current_stock_price to calculate how much user will have based on which stocks holds',

    func: async () => {
      console.log(`get_user_balance `);
      const res = await stockService.getUserBalance();
      console.log(res);
      return JSON.stringify(res);
    },
  });
