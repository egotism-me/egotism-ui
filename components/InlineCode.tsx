import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface InlineCodeProps {
  children: ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <Box component="span" sx={{
        backgroundColor: '#f5f5f520',
        borderRadius: '4px',
        fontFamily: 'monospace',
        padding: '2px 4px',
      }}>
        {children}
      </Box>
  );
};

export default InlineCode;

