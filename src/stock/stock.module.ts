import { Module } from '@nestjs/common';
import { StockResolver } from './resolver/stock.resolver';
import { StockService } from './service/stock.service';

@Module({
  providers: [StockResolver, StockService]
})
export class StockModule {}
