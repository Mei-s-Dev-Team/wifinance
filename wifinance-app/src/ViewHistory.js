import { render } from '@testing-library/react';
import { upload } from '@testing-library/user-event/dist/upload';
import React, { useState, Component } from 'react';
import './ViewHistory.css';

const ViewHistoryForm = ({ transactionHistory, setTransactionHistory }) => { 
  
  const [pageNumber, setPageNumber] = useState(0);

  // Sets and updates transaction data

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

  return (
    <div>
      <div id="first-section">   
        <p>Transaction History</p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Retrieve Finances</button>
        </form>
        <div className='transaction-data'>
          <TransRow rowNumber={0} pageNumber={pageNumber} data={transactionHistory} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
          <TransRow rowNumber={1} pageNumber={pageNumber} data={transactionHistory} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
          <TransRow rowNumber={2} pageNumber={pageNumber} data={transactionHistory} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
          <TransRow rowNumber={3} pageNumber={pageNumber} data={transactionHistory} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
          <TransRow rowNumber={4} pageNumber={pageNumber} data={transactionHistory} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
          <TransRow rowNumber={5} pageNumber={pageNumber} data={transactionHistory} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
        </div>
      </div>
    </div>
  );
};

// Displays transaction information in a row
const TransRow = (props) => {

  const transaction = props.data[props.rowNumber+(6*props.pageNumber)] ?? []; 
  const transHistory = props.data;
  const rowNum = props.rowNumber;

  // Converts Date() object to "YYYY-MM-DD" format
  const convertDateFormat = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  // Transaction Data
  var [amount, setAmount] = useState('') ?? transaction[1];
  var [date, setDate] = useState('') ?? convertDateFormat(transaction[4]);
  var [vendor, setVendor] = useState('') ?? transaction[3];
  var [purchase_type, setPurchase_type] = useState('') ?? transaction[5];
  const payment_type = transaction[2];

  const [isEditable, setIsEditable] = useState(true);

  // Sets editing state to opposite
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  // Handles updates for the row of data
  const handleEdit =  async () => {
    if (amount == '') {
      setAmount(transaction[1]);
      amount = transaction[1];
      console.log("amount");
    }
    if (date == '') {
      setDate(convertDateFormat(transaction[4]));
      date = convertDateFormat(transaction[4]);
      console.log("date")
    }
    if (vendor == '') {
      setVendor(transaction[3]);
      vendor = transaction[3];
      console.log("vendor");
    }
    if (purchase_type == '') {
      setPurchase_type(transaction[5]);
      purchase_type = transaction[5];
      console.log("purchase type");
    }

    const ID = transaction[0];
    const data = {
      payment_type,
      date,
      purchase_type,
      vendor,
      amount: parseFloat(amount),
      id: ID
    };
    
    console.log(data);

    try {
      const response = await fetch('http://localhost:8080/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(response);
      if (response.ok) {
        const responseData = await response.json(); 
        updatePage(data);
        alert('Request successful');
      } else {
        alert('Error submitting (Update)');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred in attempt to update data');
    }
  } // handleEdit()

  const handleDelete = async (e) => {
    e.preventDefault();
    const ID = transaction[0];
    const deleteData = {
      id: ID
    };
    try {
      const response = await fetch('http://localhost:8080/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData)
      });
      console.log(response);
      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData.query_data);
        alert('Request successful');
      } else {
        alert('Error submitting  (Delete)');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred in attempt to delete data');
    }
  } // handleDelete()

  const updatePage = (data) => {
    const userID = '1';
    const newRowData = [ data.id, userID, data.amount, data.payment_type, data.vendor, data.date, data.purchase_type ];
    const updatedTransactionHistory = transHistory;
    console.log("Old Data");
    console.log(updatedTransactionHistory);
    console.log("New Row Data");
    console.log(newRowData);
    updatedTransactionHistory[rowNum] = newRowData;
    props.setTransactionHistory(updatedTransactionHistory);
    console.log("New Data");
    console.log(updatedTransactionHistory);
  }
    // payment_type, 0
    // date, 1
    // purchase_type, 2
    // vendor, 3
    // amount: parseFloat(amount), 4
    // id: ID 5
  

  return (
    <div className='transaction-data-row'>

      <div className='transaction-data-info'>
        {isEditable ? (
          <p>{transaction[1]}</p>
        ) : (
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            max={99999}
            placeholder="Amount"
          />        
          )}
      </div>

      <div className='transaction-data-info'>
        {isEditable ? (
          <p>{transaction[3]}</p>
        ) : (
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            maxLength={50}
            placeholder="Vendor"
          />        
          )}
      </div>

      <div className='transaction-data-info'>
        {isEditable ? (
          <p>{convertDateFormat(transaction[4])}</p>
        ) : (
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="Purchase Date「YYYY-MM-DD」"
          />        
          )}
      </div>

      <div className='transaction-data-info'>
        {isEditable ? (
          <p>{transaction[5]}</p>
        ) : (
          <input
            type="text"
            value={purchase_type}
            onChange={(e) => setPurchase_type(e.target.value)}
            maxLength={50}
            placeholder="Category"
          />          
          )}
      </div>

      <div>
        {isEditable ? (
          <button onClick={toggleEdit}>Edit</button>
        ) : (
          <button onClick={() => { toggleEdit(); handleEdit(); }}>Submit</button>
        )}
      </div>      
      <button onClick={handleDelete}>Delete</button>
    </div>
  ); // return 
  
}

// Change the number of the page
const ChangePageNum = (props) => {

}

export default ViewHistoryForm;
