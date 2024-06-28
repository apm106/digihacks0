import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({ value, onChange }) {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Input content" id="fullWidth" value={value} onChange={onChange} />
    </Box>
  );
}
