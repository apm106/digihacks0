import React, { useState } from 'react';
import axios from 'axios';
import BoxBasic from './components/BoxBasic';
import Input from './components/Input';
import SubmitButton from './components/SubmitButton';

function App() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    console.log("in handInputChange")
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/article-review', { articleText: inputValue }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.response);
    } catch (error) {
      console.error('Error sending the article review:', error.message);
      if (error.response) {
        console.error('Server responded with status code', error.response.status);
        console.error('Response data:', error.response.data);
      }
    }    
  };

  return (
    <BoxBasic>
      <h1>Trust-o-meter!</h1>      
      <Input value={inputValue} onChange={handleInputChange} />
      <SubmitButton onClick={handleSubmit} />
      <p>Response from backend: {message}</p>
    </BoxBasic>
  );
}

export default App;