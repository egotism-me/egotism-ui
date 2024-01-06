import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Box, Button, Card, CardActions, CardContent, Container, Typography, TextField, Grid, Switch, FormGroup, FormControlLabel, Tooltip} from '@mui/material';
import Image from 'next/image';
import Logo from '../public/images/egotism.svg';
import { useTheme } from '@mui/material/styles';

const Home: NextPage = () => {
  const theme = useTheme();

  return (
    <Layout useContainer={false}>
      <div style={{ 
        width: '100%', 
        minHeight: '100vh',
        backgroundColor: theme.palette.secondary.main, 
        textAlign: 'center', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Image src={Logo} alt='Logo' />
        <Image src='/images/egotism_collage_small.png' alt='Name' width={716} height={286} />
      </div>
      <Container style={{minHeight: '80vh'}}>
        <Typography variant='h2' fontFamily='ui-serif' textAlign='center' pt={theme.spacing(4)}>
          Vanity Addresses On-Demand
        </Typography>
        <Typography variant='h5' fontFamily='ui-serif' textAlign='center' mt={theme.spacing(2)}>
          Decentralized Delivery of Your Digital Identity
        </Typography>
        <Card style={{marginTop: theme.spacing(4)}}>
          <CardContent style={{ padding: theme.spacing(2)}}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12}>
                <FormGroup>
                  <Tooltip title='Coming soon' placement='bottom-start'>
                    <FormControlLabel control={<Switch disabled />} label='On-Chain' />
                  </Tooltip>
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant='subtitle1' textAlign='center'>Starts With:</Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <TextField
                  label='Start'
                  variant='outlined'
                  fullWidth
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant='subtitle1' textAlign='center'>Ends With:</Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <TextField
                  label='End'
                  variant='outlined'
                  fullWidth
                  autoComplete='off'
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Button 
                variant='contained'
                color='primary'>
                Generate
              </Button>
            </Box>
          </CardActions>
        </Card>
        <Typography 
          variant='subtitle2' 
          fontFamily='ui-serif' 
          textAlign='center' 
          pt={theme.spacing(4)}
          color={theme.palette.text.disabled}>
          As of now, only local generation mode is avaialable.
        </Typography>
      </Container>
    </Layout>
  );
};

export default Home;
