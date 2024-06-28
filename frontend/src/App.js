import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoxBasic from './components/BoxBasic';
import Input from './components/Input';
import SubmitButton from './components/SubmitButton';

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
    <BoxBasic>
        <h1>Trust-o-meter!</h1>
        <p>Response from backend: {message}</p>
        <Input />
        <SubmitButton />
    </BoxBasic>
  );
}

export default App;