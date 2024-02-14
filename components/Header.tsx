import React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar position='sticky' >
      <Toolbar>
        <Box style={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button color="inherit">About</Button>
          </Link>
        </Box>
        <Box style={{ flexGrow: 0 }}>
          <ConnectButton />
        </Box>
</Toolbar>
    </AppBar>
  );
};

export default Header;

