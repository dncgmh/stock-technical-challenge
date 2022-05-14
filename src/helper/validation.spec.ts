import { validation } from './validation';

describe('validation', () => {
  describe('isString', () => {
    const cases: any[] = [
      ['', true],
      ['hello', true],
      [0, false],
      [undefined, false],
      [null, false],
      [true, false]
    ];
    test.each(cases)('given %p as arguments, returns %p', (value, expectedResult) => {
      expect(validation.isString(value)).toBe(expectedResult);
    });
  });
});
describe('IsNumber', () => {
  const cases: any[] = [
    ['', false],
    ['hello', false],
    [undefined, false],
    [null, false],
    [true, false],
    [NaN, false],
    [Infinity, false],
    [0, true],
    [-5, true],
    [1.25, true]
  ];
  test.each(cases)('given %p as arguments, returns %p', (value, expectedResult) => {
    expect(validation.isNumber(value)).toBe(expectedResult);
  });
});
