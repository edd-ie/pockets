import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardTransactionTable from './CardTransactionTable';

const Cards = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    details: [],
    balance: '',
    category: '',
    bank: '',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTransactionTable, setShowTransactionTable] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('https://pockets.onrender.com/cards')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.log(error));
  }, []);

  const handleAddTransaction = (transaction) => {
    // Add the transaction to the first card
    const updatedCards = [...cards];
    updatedCards[0].cardTransactions.push(transaction);
    setCards(updatedCards);
  };

  const handleCardClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleViewTransactions = () => {
    setShowTransactionTable(true);
  };

  const handleGoBack = () => {
    setShowTransactionTable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "details") {
      setNewCard((prevState) => ({
        ...prevState,
        [name]: [value], // Initialize as an array with the current value
      }));
    } else {
      setNewCard((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch('https://pockets.onrender.com/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then(response => response.json())
      .then(data => {
        setTransactions(prevTransactions => [...prevTransactions, data]);
        setNewCard({
          cardNumber: '',
          details: [],
          balance: '',
          category: '',
          bank: '',
        });
      })
      .catch(error => console.log(error));
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="gHead">
      <h1>Cards</h1>
      <div className="gCards-container">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div
              className="gCard"
              key={index}
              onClick={() => handleCardClick(transaction)}
            >
              <h2>{transaction.name}</h2>
            </div>
          ))
        ) : (
          <p>No transactions available</p>
        )}

        <div className="gDropdown">
          <button onClick={toggleDropdown}>Toggle Dropdown</button>
          {showDropdown && (
            <div className="gDropdown-content">
              <div className="card-details">
                <h2>Card Details</h2>
                <p>Card Number: {newCard.cardNumber ? newCard.cardNumber : 'N/A'}</p>
                <p>Details: {newCard.details.length ? newCard.details.join(', ') : 'N/A'}</p>
                <p>Balance: {newCard.balance ? newCard.balance : 'N/A'}</p>
                <p>Category: {newCard.category ? newCard.category : 'N/A'}</p>
                <p>Bank: {newCard.bank ? newCard.bank : 'N/A'}</p>
              </div>

              <div className="gCard-form">
                <h3>Add New Card</h3>
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={newCard.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="details">Details:</label>
                    <input
                      type="text"
                      id="details"
                      name="details"
                      value={newCard.details}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="balance">Balance:</label>
                    <input
                      type="text"
                      id="balance"
                      name="balance"
                      value={newCard.balance}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="category">Category:</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={newCard.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="bank">Bank:</label>
                    <input
                      type="text"
                      id="bank"
                      name="bank"
                      value={newCard.bank}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit">Add Card</button>
                </form>
              </div>
            </div>
          )}
        </div>

        {selectedTransaction && (
          <div className="gTransaction-details">
            <div className="gModal">
              <h3>Transaction Details</h3>
              {selectedTransaction.cardTransactions && selectedTransaction.cardTransactions.length > 0 ? (
                <ul>
                  {selectedTransaction.cardTransactions.map((transaction, index) => (
                    <li key={index}>{transaction.category}: {transaction.amount}</li>
                  ))}
                </ul>
              ) : (
                <p>No transactions available</p>
              )}
              <div>
                <strong>Balance:</strong> {selectedTransaction.balance}
              </div>
              <div>
                <strong>Category:</strong> {selectedTransaction.category}
              </div>
              <div>
                <strong>Bank:</strong> {selectedTransaction.bank}
              </div>
              <button onClick={handleViewTransactions}>View Transactions</button>
              <button onClick={() => setSelectedTransaction(null)}>Close</button>
            </div>
          </div>
        )}

        {showTransactionTable && (
          <CardTransactionTable
            transactions={transactions}
            goBack={handleGoBack}
          />
        )}
      </div>
    </div>
  );
};

export default Cards;
