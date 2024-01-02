import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography variant='h6'>Hello mom</Typography>
    </Layout>
  );
};

export default Home;
