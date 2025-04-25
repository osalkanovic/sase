import { Injectable } from '@nestjs/common';
import { SaseApiService } from '../sase-api/sase-api.service';

@Injectable()
export class StockService {
  private userBalance = 1000;
  private userStocks = new Map();
  constructor(private readonly saseApiService: SaseApiService) {
    this.userStocks.set('BHTSR', 200);
  }

  buyStocks(symbol: string, price: number, amount: number) {
    const totalPrice = Number(price) * Number(amount);
    console.log(totalPrice, this.userBalance);
    if (totalPrice > this.userBalance) {
      return {
        success: false,
        reason: 'You do not have sufficient funds in your account',
      };
    }
    this.userBalance -= totalPrice;
    this.userStocks.set(
      symbol,
      (this.userStocks.get(symbol) ? Number(this.userStocks.get(symbol)) : 0) +
        amount
    );
    //TODO: send email

    return {
      success: false,
      reason: 'The order has been successfully forwarded to the broker.',
    };
  }

  async getUserBalance() {
    let stocks = {};
    const rawStocks = Object.fromEntries(this.userStocks);
    for (const stock of Object.keys(rawStocks)) {
      const userAmount = rawStocks[stock];
      const currentPrice = await this.saseApiService.getStockPrice(stock);
      const value = Number(currentPrice) * userAmount;
      if (userAmount > 0) {
        stocks = {
          ...stocks,
          [stock]: {
            amount: userAmount,
            value: `${value} KM`,
            currentPrice: `${currentPrice} KM`,
          },
        };
      }
    }
    return {
      userBalance: `${this.userBalance} KM`,
      stocks,
    };
  }

  sellStock(symbol: string, price: number, amount: number) {
    const totalPrice = Number(price) * Number(amount);
    if (amount > this.userStocks.get(symbol)) {
      return {
        success: false,
        reason: `You do not have sufficient amount of stocks in your account, your balance is ${this.userStocks.get(
          symbol
        )}`,
      };
    }
    this.userBalance += totalPrice;
    this.userStocks.set(symbol, Number(this.userStocks.get(symbol)) - amount);
  }
}
