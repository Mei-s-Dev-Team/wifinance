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
      sortedTransactionHistory.push(
        [responseData.query_data[i][0],responseData.query_data[i][2],responseData.query_data[i][3],
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

  const pageNumber = 0;
  return (
    <div>
      <div id="first-section">   
        <p>Transaction History</p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Retrieve Finances</button>
        </form>
        <div className='transaction-data'>
          <TransRow rowNumber={0} pageNumber={pageNumber} data={transactionHistory}/>
          <TransRow rowNumber={1} pageNumber={pageNumber} data={transactionHistory}/>
          <TransRow rowNumber={2} pageNumber={pageNumber} data={transactionHistory}/>
          <TransRow rowNumber={3} pageNumber={pageNumber} data={transactionHistory}/>
          <TransRow rowNumber={4} pageNumber={pageNumber} data={transactionHistory}/>
          <TransRow rowNumber={5} pageNumber={pageNumber} data={transactionHistory}/>
        </div>
      </div>
    </div>

  );
};

const TransRow = (props) => {
  const transaction = props.data[props.rowNumber+(6*props.pageNumber)] ?? []; 
  const handleDelete = async (e) => {
    e.preventDefault();
    const ID = transaction[0];
    const deleteData = {
      id: ID
    };

    // Send HTTP POST request to server
    try {
      const response = await fetch('http://localhost:8080/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData)
      });
      console.log(response);
      // Handle response
      if (response.ok) {
        // Success
        const responseData = await response.json(); 
        console.log(responseData.query_data);
        alert('Request successful');
      } else {
        // Error
        alert('Error submitting  (Delete)');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred in attempt to delete data');
    }
  }
  return (
    <div className='transaction-data-row'>
      <p>{transaction[1]}</p>
      <p>{transaction[3]}</p>
      <p>{transaction[4]}</p>
      <p>{transaction[5]}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ViewHistoryForm;
