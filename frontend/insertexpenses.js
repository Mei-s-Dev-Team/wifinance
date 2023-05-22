import React, { useState } from 'react';

const InsertExpenses = () => {
  const [payment_type, setPayment_type] = useState('');
  const [date, setDate] = useState('');
  const [purchase_type, setPurchase_type] = useState('');
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState('');
  const [user_id, setUser_id] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!payment_type || !date || !purchase_type || !vendor || !amount || !user_id) {
      alert('Please fill in all fields');
      return;
    }

    // Create data object
    const data = {
      payment_type,
      date,
      purchase_type,
      vendor,
      amount: parseFloat(amount),
      user_id
    };

    // Send HTTP POST request to server
    try {
      const response = await fetch('http://localhost:8080/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Handle response
      if (response.ok) {
        // Success
        alert('Form submitted successfully');
      } else {
        // Error
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div>
      <h1>My Form Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="payment_type">Payment Type:</label>
          <input
            type="text"
            id="payment_type"
            value={payment_type}
            onChange={(e) => setPayment_type(e.target.value)}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="date">Date of Purchase:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div>
          <label htmlFor="purchase_type">Purchase Type:</label>
          <select
            id="purchase_type"
            value={purchase_type}
            onChange={(e) => setPurchase_type(e.target.value)}
          >
            <option value="">Select Purchase Type</option>
            <option value="food">Food</option>
            <option value="gas">Gas</option>
            <option value="entertainment">Entertainment</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div>
          <label htmlFor="vendor">Vendor:</label>
          <input
            type="text"
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="amount">Payment Value:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            max={99999}
          />
        </div>

        <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            maxLength={50}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InsertExpenses;