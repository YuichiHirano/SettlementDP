import React, { useState } from 'react';
import './App.css';
import { calculateMaxCombination } from './dpUtils';

function App() {
  const [budget, setBudget] = useState<number>(30000);
  const [receipts, setReceipts] = useState<number[]>([0]);
  const [result, setResult] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleReceiptChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReceipts = [...receipts];
    newReceipts[index] = Number(e.target.value);
    setReceipts(newReceipts);
  };

  const addReceiptField = () => {
    setReceipts([...receipts, 0]);
  };

  const removeReceiptField = (index: number) => () => {
    setReceipts(receipts.filter((_, i) => i !== index));
  };

  const handleCalculateClick = () => {
    const { selectedReceipts, totalAmount } = calculateMaxCombination(receipts, budget);
    setResult(selectedReceipts);
    setTotalAmount(totalAmount);
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
        <label>レシート金額:</label>
        {receipts.map((receipt, index) => (
          <div key={index}>
            <input type="number" value={receipt} onChange={handleReceiptChange(index)} />円
            <button onClick={removeReceiptField(index)}>-</button>
          </div>
        ))}
        <button onClick={addReceiptField}>+</button>
      </div>
      <button onClick={handleCalculateClick}>Calculate</button>
      <div>
        <h2>選ばれたレシート:</h2>
        <ul>
          {result.map((receipt, index) => (
            <li key={index}>{receipt}円</li>
          ))}
        </ul>
        <h3>合計金額: {totalAmount}円</h3>
      </div>
    </div>
  );
}

export default App;
