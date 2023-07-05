import React, { useState, useEffect } from 'react';
import './Cards.css';

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

  useEffect(() => {
    // Fetch data from API
    // Example:
  fetch('URL')
    .then(response => response.json())
    .then(data => setTransactions(data))
    .catch(error => console.log(error));

    // Mock data for testing
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
    setTransactions((prevState) => [...prevState, newCard]);
    setNewCard({
      cardNumber: '',
      details: [],
      balance: '',
      category: '',
      bank: '',
    });
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="gHead">
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
              <button onClick={() => setSelectedTransaction(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
