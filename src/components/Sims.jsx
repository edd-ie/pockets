import React, { useState, useEffect } from 'react';
import SimTransactionTable from './SimTransactionTable.jsx';
import "./Sims.css";
import { Link } from 'react-router-dom';

const Sims = ({userID}) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [newSim, setNewSim] = useState({
    user_id: '',
    simName: '',
    balance: '',
    name: '',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTransactionTable, setShowTransactionTable] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    amount: 0,
  });

  useEffect(() => {
    fetch('https://pockets.onrender.com/sims')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.log(error));
  }, []);

const handleAddTransaction = (event) => {
  event.preventDefault();

  if (!selectedTransaction) {
    return; // Return early if selectedTransaction is null
  }

  const selectedSimIndex = transactions.findIndex(
    (sim) => sim.id === selectedTransaction.id
  );

  const updatedSelectedTransaction = { ...transactions[selectedSimIndex] };

  if (!Array.isArray(updatedSelectedTransaction.simTransactions)) {
    updatedSelectedTransaction.simTransactions = [];
  }

  const updatedSimTransactions = [
    ...updatedSelectedTransaction.simTransactions,
    newTransaction,
  ];

  updatedSelectedTransaction.simTransactions = updatedSimTransactions;

  const updatedTransactions = [...transactions];
  updatedTransactions[selectedSimIndex] = updatedSelectedTransaction;

  fetch(`https://pockets.onrender.com/sims/${selectedTransaction.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSelectedTransaction),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Transaction added successfully:', data);
    })
    .catch((error) => {
      console.error('Error adding transaction:', error);
    });

  setTransactions(updatedTransactions);
  setNewTransaction({
    category: '',
    amount: 0,
  });
};
  
  
  const handleRemoveSim = (simId) => {
    // Remove the selected Sim from the transactions
    const updatedTransactions = transactions.filter((sim) => sim.id !== simId);
  
    // Update the transactions state
    setTransactions(updatedTransactions);
  
  

    // Make an API request to delete the Sim from the backend
    fetch(`https://pockets.onrender.com/sims/${simId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log('Sim deleted successfully:', data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error deleting Sim:', error);
      });
  // Close the modal by resetting the selectedTransaction state
      setSelectedTransaction(null);
  };
  
  const handleSimClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleGoBack = () => {
    setShowTransactionTable(false);
  };

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNewSim((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};


  const handleAddSim = (event) => {
    event.preventDefault();
  
    // Make an API request to add the new Sim to the backend
    fetch('https://pockets.onrender.com/sims', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSim),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log('Sim added successfully:', data);
  
        // Update the transactions state with the new Sim
        setTransactions((prevState) => [...prevState, data]);
  
        // Reset the newSim state
        setNewSim({
          user_id: '',
          name: '',
          balance: '',
          simName: '',
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error adding Sim:', error);
      });
  };
  

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const categoryOptions = ['food', 'clothes', 'electronics', 'household', 'other', 'transport', 'health', 'education', 'entertainment'];
  const sims = ['telcom', 'airtel', 'saf'];

  return (
    <div className="gSimsHome">
      <Link to='/'>
        <div id='mainLogo'>
          <h1>POC<span>KETS</span></h1>
        </div>
      </Link>
      <div className="gHead">
      <h1 id ='gHead-title'>Sims</h1>
      <div className="gSims-container">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div id={'sim'+(index +1)}
              className="gSim"
              key={index}
              onClick={() => handleSimClick(transaction)}
            >
              <h2>{transaction.name}</h2>
            </div>
          ))
        ) : (
          <p>No transactions available</p>
        )}

      <div className="gDropdown">
        {!showDropdown &&<button id='gBTN' onClick={toggleDropdown}>Add Sim</button>}
          {showDropdown && (
            <div className="gDropdown-content">
              <div className="sim-details">
                <h2 id = 'gDetails-title'>Sim Details</h2>
                <p>User_id: {newSim.user_id ? newSim.user_id : 'N/A'}</p>
                <p>Name: {newSim.simName ? newSim.simName : 'N/A'}</p>
                <p>Sim: {newSim.name ? newSim.name : 'N/A'}</p>
                <p>Balance: {newSim.balance ? newSim.balance : 'N/A'}</p>
              </div>

                <div className="gSim-form">
                  <h3>Add New Sim</h3>
                  <form onSubmit={handleAddSim}>
                  <div>
                      <input
                        type="text"
                        placeholder="User_id"
                        name="user_id"
                        value={newSim.user_id}
                        onChange={handleInputChange}
                      />
                    </div>
                  <div>
                      <input
                        type="text"
                        placeholder="Name"
                        name="simName"
                        value={newSim.simName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div id = 'gAddNewSim'>
                      <select
                        name="name"
                        value={newSim.name}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a Sim</option>
                        {sims.map((sim) => (
                          <option key={sim} value={sim}>
                            {sim}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Balance"
                        name="balance"
                        value={newSim.balance}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit">Add Sim</button>
                  </form>
                </div>
            </div>
          )}
        </div>

        {selectedTransaction && (
          <div className="gTransaction-details">
            <div className="gModal">
              <h3>Transaction Details</h3>
              {selectedTransaction.simTransactions &&
              selectedTransaction.simTransactions.length > 0 ? (
                <ul>
                  {selectedTransaction.simTransactions.map((transaction, index) => (
                    <li key={index}>
                      {transaction.category}: {transaction.amount}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions available</p>
              )}
              <form onSubmit={handleAddTransaction}>
                <div id ='gCategoryDropDown'>
                    <select
                      name="category"
                      value={newTransaction.category}
                      onChange={(e) =>
                        setNewTransaction((prevState) => ({
                          ...prevState,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                <div id ='gInputTransaction'>
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
              </form>
              <div id='gModal-btns'>
              <button onClick={() => handleRemoveSim(selectedTransaction.id)}>Delete Sim</button>
              <button onClick={() => setSelectedTransaction(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showTransactionTable && (
        <div className="gTransaction-table">
          <SimTransactionTable
            transactions={transactions}
            handleRemoveSim={handleRemoveSim}
            handleGoBack={handleGoBack}
          />
        </div>
      )}
    </div>
    <div id='gHelp'>
      <span className="material-symbols-sharp">
        info
      </span>
      <p>Click on a Sim to view/add transactions</p>
    </div>
    </div>
  );
}

export default Sims;