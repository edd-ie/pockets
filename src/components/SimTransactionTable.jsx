import React, { useState, useEffect } from 'react';
import './SimTransactionTable.css';

const SimTransactionTable = ({ transactions, onAddTransaction }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [apiTransactions, setApiTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from API
    fetch('https://pockets.onrender.com/sims')
      .then(response => response.json())
      .then(data => setApiTransactions(data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({ category, amount });
    setCategory('');
    setAmount('');
  };

  return (
    <div>
      <h3>Transaction Table</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.created_at}</td>
            </tr>
          ))}
          {apiTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default SimTransactionTable;
