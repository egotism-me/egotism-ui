import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
  useContainer?: boolean; 
}

const Layout: React.FC<LayoutProps> = ({ children, useContainer = true }) => {
  const theme = useTheme();

  const content = useContainer ? (
    <Container style={{ marginTop: theme.spacing(2), minHeight: '100vh' }}>
      {children}
    </Container>
  ) : (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );

  return (
    <>
      <Header />
        {content}
      <Footer />
    </>
  );
};

export default Layout;
