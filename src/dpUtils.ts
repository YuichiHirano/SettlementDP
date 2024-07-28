export const calculateMaxCombination = (receipts: number[], budget: number) => {
    const dp: number[][] = Array.from({ length: receipts.length + 1 }, () => Array(budget + 1).fill(0));
  
    for (let i = 1; i <= receipts.length; i++) {
      for (let w = 1; w <= budget; w++) {
        if (receipts[i - 1] <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - receipts[i - 1]] + receipts[i - 1]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
  
    let w = budget;
    const selectedReceipts: number[] = [];
    for (let i = receipts.length; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedReceipts.push(receipts[i - 1]);
        w -= receipts[i - 1];
      }
    }
    selectedReceipts.sort((a, b) => a - b);
  
    const totalAmount = selectedReceipts.reduce((acc, curr) => acc + curr, 0);
  
    return { selectedReceipts, totalAmount };
  };
  