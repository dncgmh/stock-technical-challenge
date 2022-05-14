import { BadRequestException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { StockService } from '../service/stock.service';
import { GrowthStockResponseDto } from '../stock.dto';
import { IStock } from '../stock.interface';

@Resolver()
export class StockResolver {
  constructor(private readonly stockService: StockService) {}
  private readonly logger = new Logger(StockResolver.name);

  @Query(() => String)
  healthy() {
    return 'OK';
  }

  @Mutation(() => GrowthStockResponseDto)
  async getMinMaxGrowthStockFromFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload
  ) {
    if (!filename.toLowerCase().includes('csv')) throw new BadRequestException('Invalid file type');
    const stream = createReadStream();
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const data = buffer.toString();
    let minGrowthStock: IStock[] = [],
      maxGrowthStock: IStock[] = [];
    data.split('\n').map((line, index) => {
      // skip header
      if (index === 0) return;
      const lineArray: string[] = line.split(',');
      const stock: IStock = {
        code: lineArray[0].toUpperCase(),
        growth: this.stockService.calculateGrowthRate(+lineArray[1], +lineArray[2])
      };
      const isValidStock = this.stockService.validateStock(stock);
      if (!isValidStock) return this.logger.debug(`INVALID INPUT LINE ${index + 1}`);
      if (!minGrowthStock.length) {
        minGrowthStock = [stock];
        maxGrowthStock = [stock];
        return;
      }
      if (minGrowthStock[0].growth > stock.growth) minGrowthStock = [stock];
      else if (minGrowthStock[0].growth === stock.growth) minGrowthStock.push(stock);
      if (maxGrowthStock[0].growth < stock.growth) maxGrowthStock = [stock];
      else if (maxGrowthStock[0].growth === stock.growth) maxGrowthStock.push(stock);
    });
    const firstMinGrowthStock = this.stockService.getFirstStockByAlphabet(minGrowthStock);
    const firstMaxGrowthStock = this.stockService.getFirstStockByAlphabet(maxGrowthStock);
    return {
      min: firstMinGrowthStock,
      max: firstMaxGrowthStock
    };
  }
}
