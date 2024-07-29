import React, { useState, useEffect } from 'react';
import './App.css';
import { calculateMaxCombination } from './dpUtils';
import { Container, TextField, Button, Box, Typography, IconButton, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';

const LOCAL_STORAGE_KEY ="settlementDP";

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // 中央揃えオプション
  gap: '20px' // ボタン間のスペースを確保
};

const loadInitialData = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    return { budget: parsedData.budget, receipts: parsedData.receipts };
  }
  return { budget: 30000, receipts: [500] };
};
const initialState = loadInitialData();

function App() {
  const [budget, setBudget] = useState<number>(initialState.budget);
  const [receipts, setReceipts] = useState<number[]>(initialState.receipts);
  const [result, setResult] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ budget, receipts }));
  }, [budget, receipts]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleReceiptChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReceipts = [...receipts];
    newReceipts[index] = Number(e.target.value);
    setReceipts(newReceipts);
  };

  const addReceiptField = () => {
    setReceipts([...receipts, 500]);
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
    <Container sx={{ bgcolor: '#ffffff', color: '#000000', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom>経費計算DPアプリ</Typography>
      <TextField
        label="経費"
        type="number"
        value={budget}
        onChange={handleBudgetChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Typography variant="h6">レシート金額</Typography>
      {receipts.map((receipt, index) => (
        <div key={index}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
              type="number"
              value={receipt}
              onChange={handleReceiptChange(index)}
              variant="outlined"
              margin="normal"
              fullWidth
            />円
            <IconButton onClick={removeReceiptField(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </div>
      ))}
      <Box sx={containerStyle}>
        <Button
          startIcon={<AddIcon />}
          onClick={addReceiptField}
          variant="contained"
          color="primary"
        >
          レシートを追加
        </Button>

        <Button
          startIcon={<CalculateIcon />} // 計算するボタンにもアイコンを追加(例として計算アイコン)
          onClick={handleCalculateClick}
          variant="contained"
          color="secondary"
        >
          計算する
        </Button>
      </Box>
      <Typography variant="h5" style={{ marginTop: '30px' }}>選ばれたレシート:</Typography>
      <List>
        {result.map((receipt, index) => (
          <ListItem key={index}>{receipt}円</ListItem>
        ))}
      </List>
      <Typography variant="h6">合計金額: {totalAmount}円</Typography>
    </Container>
  );
}

export default App;

