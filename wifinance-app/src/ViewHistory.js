import React, { useState } from 'react';
import './ViewHistory.css';

const ViewHistoryForm = () => { 
  
  // Sets and updates transaction data
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Logic for submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = 1;
    const requestData = {
      user_id: userID
    };

    // Send HTTP POST request to server
    try {
      const response = await fetch('http://localhost:8080/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      console.log(response);
      // Handle response
      if (response.ok) {
        // Success
        const responseData = await response.json(); 
        console.log(responseData.query_data);
        setTransactionHistory(sortTransactionHistory(responseData));
        alert('Request successful');
      } else {
        // Error
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    }
  };

  // Gets only the necessary information
  const sortTransactionHistory = (responseData) => {
    const sortedTransactionHistory = [];
    for (let i = 0; i < responseData.query_data.length; i++) {
      sortedTransactionHistory.push([responseData.query_data[i][2],responseData.query_data[i][3],
          responseData.query_data[i][4],responseData.query_data[i][5],responseData.query_data[i][6]]
        );
    }
    // Sorts it by datetime
    const compareDateStrings = (a, b) => {
      const dateA = new Date(a[3]);
      const dateB = new Date(b[3]);
      return dateA - dateB;
    };
    sortedTransactionHistory.sort(compareDateStrings);
    return sortedTransactionHistory;
  }

  return (
    <div>
      <div id="first-section">   
        <p>Transaction History</p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Retrieve Finances</button>
        </form>
        <div className='transaction-data'>
          <div className='transaction-data-column' id='price'>
            <p>{transactionHistory[0]?.[0] ?? ''}</p>
            <p>{transactionHistory[1]?.[0] ?? ''}</p>
            <p>{transactionHistory[2]?.[0] ?? ''}</p>
            <p>{transactionHistory[3]?.[0] ?? ''}</p>
            <p>{transactionHistory[4]?.[0] ?? ''}</p>
            <p>{transactionHistory[5]?.[0] ?? ''}</p>
            <p>{transactionHistory[6]?.[0] ?? ''}</p>
          </div>
          <div className='transaction-data-column' id='location'>
            <p>{transactionHistory[0]?.[2] ?? ''}</p>
            <p>{transactionHistory[1]?.[2] ?? ''}</p>
            <p>{transactionHistory[2]?.[2] ?? ''}</p>
            <p>{transactionHistory[3]?.[2] ?? ''}</p>
            <p>{transactionHistory[4]?.[2] ?? ''}</p>
            <p>{transactionHistory[5]?.[2] ?? ''}</p>
            <p>{transactionHistory[6]?.[2] ?? ''}</p>
          </div>
          <div className='transaction-data-column' id='date'>
            <p>{transactionHistory[0]?.[3] ?? ''}</p>
            <p>{transactionHistory[1]?.[3] ?? ''}</p>
            <p>{transactionHistory[2]?.[3] ?? ''}</p>
            <p>{transactionHistory[3]?.[3] ?? ''}</p>
            <p>{transactionHistory[4]?.[3] ?? ''}</p>
            <p>{transactionHistory[5]?.[3] ?? ''}</p>
            <p>{transactionHistory[6]?.[3] ?? ''}</p>
          </div>
          <div className='transaction-data-column' id='category'>
            <p>{transactionHistory[0]?.[4] ?? ''}</p>
            <p>{transactionHistory[1]?.[4] ?? ''}</p>
            <p>{transactionHistory[2]?.[4] ?? ''}</p>
            <p>{transactionHistory[3]?.[4] ?? ''}</p>
            <p>{transactionHistory[4]?.[4] ?? ''}</p>
            <p>{transactionHistory[5]?.[4] ?? ''}</p>
            <p>{transactionHistory[6]?.[4] ?? ''}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewHistoryForm;
