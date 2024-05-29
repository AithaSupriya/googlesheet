import React, { useEffect, useState } from 'react';

function GoogleSheet() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://script.google.com/macros/s/AKfycbyrJmoRldzr7YF0fVMC-0xoofXDTr_Gex1e1cwUw4TOmUXAEndS-4g-EMqsZk4KBdGBdA/exec')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log('Fetched Data:', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (e, rowIndex, column) => {
    const newData = [...data];
    newData[rowIndex][column] = e.target.value;
    setData(newData);
  };

  const saveChanges = () => {
    fetch('https://script.google.com/macros/s/AKfycbyrJmoRldzr7YF0fVMC-0xoofXDTr_Gex1e1cwUw4TOmUXAEndS-4g-EMqsZk4KBdGBdA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log('Changes saved:', result);
      })
      .catch(error => {
        console.error('Error saving changes:', error);
      });
  };

  const login = () => {
    setShowData(true);
  };

  return (
    <div>   
      <button onClick={login}>Login</button>
      {showData && data.length > 0 &&
        <div>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([column, value], cellIndex) => (
                    <td key={cellIndex}>
                      <input 
                        type="text" 
                        value={value} 
                        onChange={(e) => handleInputChange(e, rowIndex, column)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="save-btn" onClick={saveChanges}>Save</button>
        </div>
      }
    </div>
  );
}

export default GoogleSheet;
