import React, { useState } from 'react';
import './insertexpenses.css';


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
    <div classname="container">
      
      <h2>new transaction</h2>
      <p>Please complete this form to register a new transaction. </p>

      <div classname="square-container">
        <div class="square-tab"></div>
        <div class="square"></div>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="input-container-payment-type">
          <label htmlFor="payment_type" className="label-1"></label>
          <input
            type="text"
            id="payment_type"
            value={payment_type}
            onChange={(e) => setPayment_type(e.target.value)}
            maxLength={50}
            placeholder="Payment Type"
          />
        </div>

        <div className="input-container-date">
          <label htmlFor="date" className="label-2"></label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="Purchase Date「YYYY-MM-DD」"
          />
        </div>

        <div className="input-container-purchase-type">
          <label htmlFor="purchase_type" className="label-3"></label>
          <select
            id="purchase_type"
            value={purchase_type}
            onChange={(e) => setPurchase_type(e.target.value)}
          >
            <option value="">Select Purchase Type</option>
            <option value="">----------------------------------</option>
            <option value="Education - Tuition">Education - Tuition</option>
            <option value="Education - Services">Education - Services</option>
            <option value="Education - Supplies">Education - Supplies</option>
            <option value="">----------------------------------</option>
            <option value="Entertainment - General">Entertainment - General</option>
            <option value="">----------------------------------</option>
            <option value="Food - Dining">Food - Dining</option>
            <option value="Food - Grocery">Food - Grocery</option>
            <option value="">----------------------------------</option>
            <option value="Health - Medicine">Health - Medicine</option>
            <option value="Health - Services">Health - Services</option>
            <option value="">----------------------------------</option>
            <option value="Home - Furniture">Home - Furniture</option>
            <option value="Home - Toiletries">Home - Toiletries</option>
            <option value="Home - Utilities">Home - Utilities</option>
            <option value="">----------------------------------</option>
            <option value="Services - Subscriptions">Services - Subscriptions</option>
            <option value="Services - Commissions">Services - Commissions</option>
            <option value="">----------------------------------</option>
            <option value="Technology - Application">Technology - Application</option>
            <option value="Technology - Device">Technology - Device</option>
            <option value="">----------------------------------</option>
            <option value="Transportation - Gas">Transportation - Gas</option>
            <option value="Transportation - Public">Transportation - Public</option>
            <option value="">----------------------------------</option>
            <option value="Other">Other</option>


            {/* Add more options as needed */}
          </select>
        </div>

        <div className="input-container-vendor">
          <label htmlFor="vendor" className="label-4"></label>
          <input
            type="text"
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            maxLength={50}
            placeholder="Vendor"
          />
        </div>

        <div className="input-container-amount">
          <label htmlFor="amount" className="label-5"></label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            max={99999}
            placeholder="Amount"
          />
        </div>

        <div className="input-container-user-id">
          <label htmlFor="user_id" className="label-6"></label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            maxLength={50}
            placeholder="User ID"
          />
        </div>

        <button type="submit"> ➜</button>
      </form>

    </div>
  );
};

export default InsertExpenses;

