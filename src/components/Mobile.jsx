import React from 'react';
import "./styles/mobile.css"
export default function Mobile() {



    const Cards = ({ transactions, balance, category }) => {
        return (
          <div className="aMobile">
            <h2>Client Transactions</h2>
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>{transaction}</li>
              ))}
            </ul>
            <div className="aMobile-info">
              <div>
                <strong>Balance:</strong> {balance}
              </div>
              <div>
                <strong>Category:</strong> {category}
              </div>
            </div>
          </div>
        );
      };
      }