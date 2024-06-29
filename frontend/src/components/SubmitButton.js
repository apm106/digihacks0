import * as React from 'react';
import Button from '@mui/material/Button';

export default function SubmitButton({ onClick }) {
  return (
    <Button variant="contained" onClick={onClick}>Submit</Button>
  );
}