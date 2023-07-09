import React, { useState, useEffect } from 'react';
import './Savings.css';

function Savings() {
  const [savings, setSavings] = useState([]);
  const [newSaving, setNewSaving] = useState({
    name: '',
    goal: '',
    duration: '',
    saved_amount: '',
  });

  useEffect(() => {
    fetch('https://pockets.onrender.com/savings')
      .then(response => response.json())
      .then(data => {
        setSavings(data);
      })
      .catch(error => {
        console.error('Error fetching savings:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSaving(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://pockets.onrender.com/savings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSaving),
    })
      .then(response => response.json())
      .then(data => {
        const createdSaving = data;
        setSavings(prevState => [...prevState, createdSaving]);
        setNewSaving({
          name: '',
          goal: '',
          duration: '',
          saved_amount: '',
        });
      })
      .catch(error => {
        console.error('Error creating saving:', error);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://pockets.onrender.com/savings/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setSavings(prevState => prevState.filter(saving => saving.id !== id));
      })
      .catch(error => {
        console.error(`Error deleting saving with ID ${id}:`, error);
      });
  };

  const handleUpdate = (id, updatedSaving) => {
    fetch(`https://pockets.onrender.com/savings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSaving),
    })
      .then(response => response.json())
      .then(data => {
        const updatedSavings = savings.map(saving => {
          if (saving.id === id) {
            return { ...saving, ...data };
          }
          return saving;
        });
        setSavings(updatedSavings);
      })
      .catch(error => {
        console.error(`Error updating saving with ID ${id}:`, error);
      });
  };

  const handleUpdateFormSubmit = (event, id) => {
    event.preventDefault();
    const updatedSaving = {
      goal: event.target.goal.value,
      duration: event.target.duration.value,
      saved_amount: event.target.saved_amount.value,
    };
    handleUpdate(id, updatedSaving);
  };

  return (
    <div className="savings-container">
      <h2>Savings</h2>

      <form className="savings-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newSaving.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="goal"
          placeholder="Goal"
          value={newSaving.goal}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={newSaving.duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="saved_amount"
          placeholder="Saved Amount"
          value={newSaving.saved_amount}
          onChange={handleInputChange}
        />
        <button type="submit">Add Saving</button>
      </form>

      {savings.map(saving => (
        <div className="savings-item" key={saving.id}>
          <h3>{saving.name}</h3>
          <p>Goal: {saving.goal}</p>
          <p>Duration: {saving.duration}</p>
          <p>Saved Amount: {saving.saved_amount}</p>
          <div className="update-form">
            <button>Update</button>
            <form onSubmit={(event) => handleUpdateFormSubmit(event, saving.id)}>
              <input
                type="text"
                name="goal"
                placeholder="New Goal"
              />
              <input
                type="text"
                name="duration"
                placeholder="New Duration"
              />
              <input
                type="text"
                name="saved_amount"
                placeholder="New Saved Amount"
              />
              <button type="submit">Save</button>
            </form>
          </div>
          <button onClick={() => handleDelete(saving.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Savings;
