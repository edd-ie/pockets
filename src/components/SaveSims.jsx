import React, { useState, useEffect } from 'react';

const SaveSims = ({ savings, onAddSavings }) => {
  const [goalName, setGoalName] = useState('');
  const [amount, setAmount] = useState('');
  const [apiSavings, setApiSavings] = useState([]);

  useEffect(() => {
    // Fetch savings from API
    fetch('https://pockets.onrender.com/save_sims')
      .then(response => response.json())
      .then(data => setApiSavings(data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSavings({ goalName, amount });
    setGoalName('');
    setAmount('');
  };

  return (
    <div>
      <h3>Saving Table</h3>
      <table>
        <thead>
          <tr>
            <th>goalName</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {savings.map((saving, index) => (
            <tr key={index}>
              <td>{saving.goalName}</td>
              <td>{saving.amount}</td>
              <td>{saving.created_at}</td>
            </tr>
          ))}
          {apiSavings.map((saving, index) => (
            <tr key={index}>
              <td>{saving.goalName}</td>
              <td>{saving.amount}</td>
              <td>{saving.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="goalName"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Saving Goal</button>
      </form>
    </div>
  );
};

export default SaveSims;
