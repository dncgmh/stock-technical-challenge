import { Test } from '@nestjs/testing';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [StockService]
    }).compile();

    service = module.get<StockService>(StockService);
  });

  describe('calculateGrowthRate', () => {
    const cases = [
      [15700, 22000, -28.63],
      [38100, 13500, 182.22],
      [0, 0, NaN]
    ];
    test.each(cases)('given %p and %p as arguments, returns %p', (lastPrice, previousClosed, expectedGrowth) => {
      expect(service.calculateGrowthRate(lastPrice, previousClosed)).toBe(expectedGrowth);
    });
  });
  describe('getFirstStockByAlphabet', () => {
    const cases: any[] = [
      [
        [
          { code: 'ACB', growth: 1 },
          { code: 'ABD', growth: 1 }
        ],
        { code: 'ABD', growth: 1 }
      ],
      [
        [
          { code: 'MNM', growth: 1 },
          { code: 'MLM', growth: 1 }
        ],
        { code: 'MLM', growth: 1 }
      ],
      [
        [
          { code: 'KEF', growth: 1 },
          { code: 'LEF', growth: 1 },
          { code: 'MEF', growth: 1 }
        ],
        { code: 'KEF', growth: 1 }
      ]
    ];
    test.each(cases)('given %p as arguments, returns %p', (stocks, expectedResult) => {
      expect(service.getFirstStockByAlphabet(stocks)).toEqual(expectedResult);
    });
  });
  describe('validateStock', () => {
    const cases: any[] = [
      [{ code: 'ACB', growth: 1 }, true],
      [{ code: '', growth: 1 }, false],
      [{ code: 550, growth: 1 }, false],
      [{ code: undefined, growth: 1 }, false],
      [{ code: 'ACB', growth: '' }, false],
      [{ code: 'ACB', growth: NaN }, false]
    ];
    test.each(cases)('given %p as arguments, returns %p', (stock, expectedResult) => {
      expect(service.validateStock(stock)).toBe(expectedResult);
    });
  });
});
