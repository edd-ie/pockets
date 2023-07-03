import React from 'react';

const Cards = ({ transactions, balance, category, bank }) => {
  return (
    <div className="gCard">
      <h2>Client Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
      <div className="gCard-info">
        <div>
          <strong>Balance:</strong> {balance}
        </div>
        <div>
          <strong>Category:</strong> {category}
        </div>
        <div>
          <strong>Bank:</strong> {bank}
        </div>
      </div>
    </div>
  );
};

export default Cards;