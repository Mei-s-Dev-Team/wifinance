import React, { useState } from 'react';
import './contact.css';

const MyComponent = () => {
  console.log('NEW Instance');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);

  const handleViewClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      const jsonData = await response.json();
      const jsonData2 = jsonData.query_data;

      console.log('JSON DATA: ');
      console.log(jsonData2[1][4]);

      setData(jsonData2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  return (
        
    <div className="view-container">

      <h3>view transaction history</h3>
      <pee>Please enter your User ID to view your transaction history.</pee>

      <div classname="square-container2">
          <div class="square-tab2"></div>
          <div class="square2"></div>
      </div>

      <div className="input-container">
        <input type="text2" value={userId} onChange={handleInputChange} placeholder="Enter User ID" />
        <button className="view-button" onClick={handleViewClick}>➜</button>
      </div>


      <th>Transaction ID</th>
      <th>Transaction Details</th>
        
        <table className="data-table">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                <td>{row.join(', ')}</td>
              </tr>
            ))}
        </table>
      </div>

  );
};

export default MyComponent;
