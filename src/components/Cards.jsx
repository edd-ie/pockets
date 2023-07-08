import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardTransactionTable from './CardTransactionTable';
import { Link } from 'react-router-dom';

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
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    amount: 0,
  });

  useEffect(() => {
    fetch('https://pockets.onrender.com/cards')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddTransaction = (event) => {
    event.preventDefault();

    // Add the transaction to the selected card
    const updatedTransactions = [...transactions];
    const selectedCardIndex = updatedTransactions.findIndex(
      (card) => card.id === selectedTransaction.id
    );
    updatedTransactions[selectedCardIndex].cardTransactions.push(newTransaction);

    // Update the transactions state
    setTransactions(updatedTransactions);

    // Make an API request to update the transaction in the backend
    fetch(`https://pockets.onrender.com/cards/${selectedTransaction.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log('Transaction added successfully:', data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error adding transaction:', error);
      });

    // Reset the newTransaction state
    setNewTransaction({
      category: '',
      amount: 0,
    });
  };

  const handleRemoveCard = (cardId) => {
    // Remove the selected card from the transactions
    const updatedTransactions = transactions.filter((card) => card.id !== cardId);

    // Update the transactions state
    setTransactions(updatedTransactions);

    // Make an API request to delete the card from the backend
    fetch(`https://pockets.onrender.com/cards/${cardId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log('Card deleted successfully:', data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error deleting card:', error);
      });
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
    if (name === 'details') {
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

  const handleAddCard = (event) => {
    event.preventDefault();

    // Make an API request to add the new card to the backend
    fetch('https://pockets.onrender.com/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log('Card added successfully:', data);

        // Update the transactions state with the new card
        setTransactions((prevState) => [...prevState, data]);

        // Reset the newCard state
        setNewCard({
          cardNumber: '',
          details: [],
          balance: '',
          category: '',
          bank: '',
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error adding card:', error);
      });
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div id='gCardsHome'>
      <Link to='/'>
        <div id='mainLogo'>
          <h1>POC<span>KETS</span></h1>
        </div>
      </Link>
    <div className="gHead">
      <h1 id='gHead-title'>Cards</h1>
      <div className="gCards-container">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div id={'card'+(index +1)}
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
          {!showDropdown &&<button id='gBTN' onClick={toggleDropdown}>Add Card</button>}
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
                <form onSubmit={handleAddCard}>
                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      name="cardNumber"
                      value={newCard.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Details"
                      name="details"
                      value={newCard.details.length ? newCard.details[0] : ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Balance"
                      name="balance"
                      value={newCard.balance}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Category"
                      name="category"
                      value={newCard.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Bank"
                      name="bank"
                      value={newCard.bank}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                  type="submit" onClick={toggleDropdown}>Add Card</button>
                </form>
              </div>
            </div>
          )}
        </div>

        {selectedTransaction && (
          <div className="gTransaction-details">
            <div className="gModal">
              <h3>Transaction Details</h3>
              {selectedTransaction.cardTransactions &&
              selectedTransaction.cardTransactions.length > 0 ? (
                <ul>
                  {selectedTransaction.cardTransactions.map((transaction, index) => (
                    <li key={index}>
                      {transaction.category}: {transaction.amount}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions available</p>
              )}
              <form onSubmit={handleAddTransaction}>
                <div>
                <div>
                  <input
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction((prevState) => ({
                        ...prevState,
                        amount: e.target.value,
                      }))
                    }
                  />
                </div>
                  <button type="submit">Add Transaction</button>
                </div>
              </form>
              <div id='gModal-btns'>
              <button onClick={() => handleRemoveCard(selectedTransaction.id)}>Delete Card</button>
              <button onClick={() => setSelectedTransaction(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showTransactionTable && (
        <div className="gTransaction-table">
          <CardTransactionTable
            transactions={transactions}
            handleRemoveCard={handleRemoveCard}
            handleGoBack={handleGoBack}
          />
        </div>
      )}
    </div>
    <div id='gHelp'>
      <span class="material-symbols-sharp">
        info
      </span>
      <p>Click on a card to view/add transactions</p>
    </div>
    </div>
  );
}

export default Cards;
