import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxBasic(props) {
  return (
    <Box 
      component="section" 
      sx={{ p: 2, border: '1px dashed grey' }}
      // display="flex"
    >
      {props.children}
    </Box>
  );
}