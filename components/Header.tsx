import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <AppBar position='sticky' >
      <Toolbar>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

