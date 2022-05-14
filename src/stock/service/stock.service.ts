import { Injectable } from '@nestjs/common';
import { validation } from '../../helper/validation';
import { IStock } from '../stock.interface';

@Injectable()
export class StockService {
  calculateGrowthRate(lastPrice: number, previousClosed: number): number {
    const growthRate = ((lastPrice - previousClosed) / previousClosed) * 100;
    return Math.trunc(growthRate * 100) / 100;
  }

  getFirstStockByAlphabet(stocks: IStock[]) {
    let firstStock = stocks[0];
    stocks.forEach((stock) => {
      if (firstStock.code.localeCompare(stock.code) > 0) firstStock = stock;
    });
    return firstStock;
  }

  validateStock(stock: IStock) {
    const isValidHeader = stock.code && validation.isString(stock.code);
    if (!isValidHeader) return false;
    const isValidGrowth = validation.isNumber(stock.growth);
    if (!isValidGrowth) return false;
    return true;
  }
}
