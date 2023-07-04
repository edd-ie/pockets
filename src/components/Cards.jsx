import React, { useState, useEffect } from 'react';
import './Cards.css';

const Cards = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('URL')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.log(error));

    const testData = [
      {
        cardNumber: '1234 5678 9012 3456',
        details: ['Detail 1'],
        balance: 100,
        category: 'Expense',
        bank: 'CBK'
      },
      {
        cardNumber: '9876 5432 1098 7654',
        details: ['Detail 2'],
        balance: 200,
        category: 'Food',
        bank: 'Equity'
      }
    ];
    setTransactions(testData);
  }, []);

  const handleCardClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className='gHead'>
      <h1>Cards</h1>
    <div className="gCards-container">
      {transactions.map((transaction, index) => (
        <div
          className="gCard"
          key={index}
          onClick={() => handleCardClick(transaction)}
        >
          <h2>{transaction.cardNumber}</h2>
        </div>
      ))}

      {selectedTransaction && (
        <div className="gTransaction-details">
          <h3>Transaction Details</h3>
          <ul>
            {selectedTransaction.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <div>
            <strong>Balance:</strong> {selectedTransaction.balance}
          </div>
          <div>
            <strong>Category:</strong> {selectedTransaction.category}
          </div>
          <div>
            <strong>Bank:</strong> {selectedTransaction.bank}
          </div>
        </div>
      )}
    </div>
    </div>
  );
  
};

export default Cards;