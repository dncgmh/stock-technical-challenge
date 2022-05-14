import { Test, TestingModule } from '@nestjs/testing';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { StockResolver } from '../resolver/stock.resolver';
import { StockService } from '../service/stock.service';
jest.setTimeout(10000);

describe('StockResolver', () => {
  let resolver: StockResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockResolver, StockService]
    }).compile();

    resolver = module.get<StockResolver>(StockResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getMinMaxGrowthStockFromFile', () => {
    const file = Readable.from(
      Buffer.from(
        `code,last_price,previous_closed
VIC,40000,39000
VNG,28000,28500
AAA,18000,19000
BCG,39000,40000`,
        'utf-8'
      )
    );
    const upload = {
      createReadStream: () => file as ReadStream,
      filename: 'data.csv',
      encoding: '7bit',
      mimetype: 'text/csv'
    };

    it('should return min and max growth stock', async () => {
      expect(resolver.getMinMaxGrowthStockFromFile(upload)).resolves.toEqual({
        min: { code: 'AAA', growth: -5.26 },
        max: { code: 'VIC', growth: 2.56 }
      });
    });
    const failedUpload = { ...upload, filename: 'filename.sh' };
    it('should throw error because invalid file type', async () => {
      resolver.getMinMaxGrowthStockFromFile(failedUpload).catch((err) => {
        expect(err.status).toBe(400);
      });
    });
  });
});
