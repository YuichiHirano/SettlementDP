import { useState } from 'react'
import './App.css'

function App() {
  const [budget, setBudget] = useState<number>(30000);
  const [receipts, setReceipts] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleReceiptsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(',').map(Number);
    setReceipts(values);
  };

  const calculateMaxCombination = () => {
    const dp: number[][] = Array(receipts.length + 1).fill(null).map(() => Array(budget + 1).fill(0));

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

    setResult(selectedReceipts);
  };

  return (
    <div>
      <h1>経費計算DPアプリ</h1>
      <div>
        <label>
          経費:
          <input type="number" value={budget} onChange={handleBudgetChange} />円
        </label>
      </div>
      <div>
        <label>
          レシート金額 (comma separated):
          <input type="text" onChange={handleReceiptsChange} />
        </label>
      </div>
      <button onClick={calculateMaxCombination}>Calculate</button>
      <div>
        <h2>Selected Receipts:</h2>
        <ul>
          {result.map((receipt, index) => (
            <li key={index}>{receipt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default App
