import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box mt={5} py={3} textAlign="center">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          left: 0,
          bottom: 0,
          width: '100%',
        }}>
        <IconButton component="a" href="https://twitter.com/egotism_me" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </IconButton>
        <IconButton component="a" href="https://github.com/egotism-me" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </IconButton>
      </Box>
      <Typography variant="body1">© 2024 Egotism</Typography>
    </Box>
  );
};

export default Footer;

