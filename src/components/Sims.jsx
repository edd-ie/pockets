import React, { useState, useEffect } from 'react';
import SimTransactionTable from './SimTransactionTable.jsx';
import "./Sims.css";

const Sims = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [newSim, setNewSim] = useState({
    simNumber: '',
    details: [],
    balance: '',
    category: '',
    sim: '',
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

    // Add the transaction to the selected Sim
    const updatedTransactions = [...transactions];
    const selectedSimIndex = updatedTransactions.findIndex(
      (sim) => sim.id === selectedTransaction.id
    );
    updatedTransactions[selectedSimIndex].simTransactions.push(newTransaction);

    // Update the transactions state
    setTransactions(updatedTransactions);

    // Make an API request to update the transaction in the backend
    fetch(`https://pockets.onrender.com/sims/${selectedTransaction.id}`, {
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
  };

  const handleSimClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleGoBack = () => {
    setShowTransactionTable(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'details') {
      setNewSim((prevState) => ({
        ...prevState,
        [name]: [value], // Initialize as an array with the current value
      }));
    } else {
      setNewSim((prevState) => ({
        ...prevState,
        [name]: value,
    
  }));
   }
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
          simNumber: '',
          details: [],
          balance: '',
          category: '',
          sim: '',
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

  return (
    <div className="gHead">
      <h1>Sims</h1>
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
          <button onClick={toggleDropdown}>Sim Details</button>
          {showDropdown && (
            <div className="gDropdown-content">
              <div className="sim-details">
                <h2>Sim Details</h2>
                <p>Sim Number: {newSim.simNumber ? newSim.simNumber : 'N/A'}</p>
                <p>Balance: {newSim.balance ? newSim.balance : 'N/A'}</p>
                <p>Category: {newSim.category ? newSim.category : 'N/A'}</p>
                <p>Sim: {newSim.sim ? newSim.sim : 'N/A'}</p>
              </div>

              <div className="gSim-form">
                <h3>Add New Sim</h3>
                <form onSubmit={handleAddSim}>
                  <div>
                    <input
                      type="text"
                      placeholder="Sim Number"
                      name="simNumber"
                      value={newSim.simNumber}
                      onChange={handleInputChange}
                    />
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
                  <div>
                    <input
                      type="text"
                      placeholder="Category"
                      name="category"
                      value={newSim.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Sim"
                      name="sim"
                      value={newSim.sim}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                  type="submit">Add Sim</button>
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
              </form>
              <button onClick={() => handleRemoveSim(selectedTransaction.id)}>Delete Sim</button>
              <button onClick={() => setSelectedTransaction(null)}>Close</button>
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
  );
}

export default Sims;
