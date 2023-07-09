import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardTransactionTable from './CardTransactionTable';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [newCard, setNewCard] = useState({
    user_id: '',
    name: '',
    balance: '',
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
  
    const updatedTransactions = [...transactions];
    const selectedCardIndex = updatedTransactions.findIndex(
      (card) => card.id === selectedTransaction.id
    );
    updatedTransactions[selectedCardIndex].cardTransactions.push(newTransaction);
  
    setTransactions(updatedTransactions);
  
    fetch(`https://pockets.onrender.com/cards/${selectedTransaction.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Transaction added successfully:', data);
      })
      .catch((error) => {
        console.error('Error adding transaction:', error);
      });
  
    setNewTransaction({
      category: '',
      amount: 0,
    });
  };
  

  const handleRemoveCard = (cardId) => {
    const updatedTransactions = transactions.filter((card) => card.id !== cardId);
  
    setTransactions(updatedTransactions);
  
    fetch(`https://pockets.onrender.com/cards/${cardId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Card deleted successfully:', data);
      })
      .catch((error) => {
        console.error('Error deleting card:', error);
      });
  
    setSelectedTransaction(null); // Close the modal by setting selectedTransaction to null
  };
  


  const handleCardClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleGoBack = () => {
    setShowTransactionTable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCard = (event) => {
    event.preventDefault();
  
    fetch('https://pockets.onrender.com/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Card added successfully:', data);
  
        setTransactions((prevState) => [...prevState, data]);
  
        setNewCard({
          user_id: '',
          name: '',
          balance: '',
          bank: '',
        });
  
        setSelectedTransaction(data); 
        setShowTransactionTable(false);
        setShowDropdown(false);
      })
      .catch((error) => {
        console.error('Error adding Card:', error);
      });
  };
  

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const bankOptions = ['Kcb', 'Equity', 'Coop', 'Barclays'];

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
              <div
                id={'card' + (index + 1)}
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
            {!showDropdown && (
              <button id='gBTN' onClick={toggleDropdown}>Add Card</button>
            )}
            {showDropdown && (
              <div className="gDropdown-content">
                <div className="card-details">
                  <h2>Card Details</h2>
                  <p>User_id: {newCard.user_id ? newCard.user_id : 'N/A'}</p>
                  <p>Name: {newCard.name ? newCard.name : 'N/A'}</p>
                  <p>Balance: {newCard.balance ? newCard.balance : 'N/A'}</p>
                  <p>Bank: {newCard.bank ? newCard.bank : 'N/A'}</p>
                </div>
                <div className="gCard-form">
                  <h3>Add New Card</h3>
                  <form onSubmit={handleAddCard}>
                  <div>
                      <input
                        type="text"
                        placeholder="User_id"
                        name="user_id"
                        value={newCard.user_id}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={newCard.name}
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
                    <div id ='gBankDropDown'>
                    <select
                      name="bank"
                      value={newCard.bank}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a bank</option>
                      {bankOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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
        <span className="material-symbols-sharp">
          info
        </span>
        <p>Click on a card to view/add transactions</p>
      </div>
    </div>
  );
};

export default Cards;
