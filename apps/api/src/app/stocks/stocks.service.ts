import { Injectable } from '@nestjs/common';
import { SaseApiService } from '../sase-api/sase-api.service';
import { ResendService } from '../resend/resend.service';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class StockService {
  private userBalance = 1000;
  private userStocks = new Map();
  public history = [];
  constructor(
    private readonly saseApiService: SaseApiService,
    private readonly resendService: ResendService,
    private readonly appConfigService: AppConfigService
  ) {
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
    this.resendService.sendMail(
      `Novi nalog za kupovinu`,
      `<div>
      <p>Akcija: Kupovina</p>
      <p>Korisnik: Omer Salkanovic</p>
      <p>Simbol: ${symbol}</p>
      <p>Količina: ${amount}</p> 
      <p>Cijena: ${price} KM</p> 

      </div>`
    );
    this.history.push({
      action: 'buy',
      symbol,
      price,
      amount,
      date: new Date(),
    });
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
        const stockName = this.appConfigService.companies.find(
          (c) => c.symbol === stock
        );
        stocks = {
          ...stocks,
          [stock]: {
            name: stockName.name,
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

  async getUserBalanceWithAdditionalInfo() {
    let stocks = {};
    const rawStocks = Object.fromEntries(this.userStocks);
    for (const stock of Object.keys(rawStocks)) {
      const userAmount = rawStocks[stock];
      const currentPrice = await this.saseApiService.getStockPrice(stock);
      const value = Number(currentPrice) * userAmount;
      if (userAmount > 0) {
        const stockData = this.appConfigService.companies.find(
          (c) => c.symbol === stock
        );
        stocks = {
          ...stocks,
          [stock]: {
            ...stockData,
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
    this.resendService.sendMail(
      `Novi nalog za prodaju`,
      `<div>
      <p>Akcija: Prodaja</p>
      <p>Korisnik: Omer Salkanovic</p>
      <p>Simbol: ${symbol}</p>
      <p>Količina: ${amount}</p> 
      <p>Cijena: ${price} KM</p> 

      </div>`
    );

    this.history.push({
      action: 'sell',
      symbol,
      price,
      amount,
      date: new Date(),
    });

    return {
      success: false,
      reason: 'The order has been successfully forwarded to the broker.',
    };
  }
}
