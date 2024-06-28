import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/message');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching the message:', error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Hello!</h1>
      <p>Response from backend: {message}</p>
    </div>
  );
}

export default App;