import { calculateMaxCombination } from './dpUtils';

describe('calculateMaxCombination', () => {

  test('returns correct result for basic case', () => {
    const receipts = [10, 20, 30];
    const budget = 50;

    const result = calculateMaxCombination(receipts, budget);
    
    expect(result.selectedReceipts).toEqual([20, 30]);
    expect(result.totalAmount).toBe(50);
  });

  test('returns empty array and zero total for no combination within budget', () => {
    const receipts = [40, 50, 60];
    const budget = 30;

    const result = calculateMaxCombination(receipts, budget);
    
    expect(result.selectedReceipts).toEqual([]);
    expect(result.totalAmount).toBe(0);
  });

  test('handles exact match to budget', () => {
    const receipts = [15, 25, 36, 45];
    const budget = 60;

    const result = calculateMaxCombination(receipts, budget);

    expect(result.selectedReceipts).toEqual([15, 45]);
    expect(result.totalAmount).toBe(60);
  });


  test('returns correct result for large inputs', () => {
    const receipts = Array.from({ length: 100 }, (_, i) => i + 1);
    const budget = 2500;

    const result = calculateMaxCombination(receipts, budget);

    expect(result.totalAmount).toBeLessThanOrEqual(budget);
  });

});
