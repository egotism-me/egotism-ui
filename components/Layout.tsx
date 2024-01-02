import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = ({ children })  => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Container style={{ marginTop: theme.spacing(2), minHeight: '100vh' }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
