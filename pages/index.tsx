import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Box, Button, Card, CardActions, CardContent, Container, Typography, TextField, Grid, Switch, FormGroup, FormControlLabel, Tooltip} from '@mui/material';
import Image from 'next/image';
import Logo from '../public/images/egotism.svg';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { wrap } from 'comlink';
import { MinerWorker } from '../lib/miner.worker';

const isHex = (s: string): boolean => {
  return /^[0-9A-Fa-f]*$/.test(s);
}

const Home: NextPage = () => {
  const theme = useTheme();

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const isGenerateAvailable = (): true | string => {
    if (start.length === 0 && end.length === 0) {
      return 'Fields are empty';
    }
    if (!isHex(start) || !isHex(end)) {
      return 'Fields are not hex';
    }
    if (start.length % 2 !== 0 || end.length % 2 !== 0) {
      return 'Uneven hex strings'
    }

    return true;
  }

  const onGenerateClick = async () => {
    // const minerWorker = new Worker('../lib/miner.worker', { type: 'module' });
    // const minerWorkerWrapped = wrap<MinerWorker>(minerWorker);
    // console.log(await minerWorkerWrapped.runMiner());
    const worker = new Worker(new URL('../lib/miner.worker.ts', import.meta.url));
    const workerWrapped = wrap<MinerWorker>(worker);
    console.log('beginning...');
    console.log(await workerWrapped.runMiner());
    console.log('done!');
    // console.log(workerWrapped);
  }

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
              <Grid item xs={12} md={2}>
                <FormGroup>
                  <Tooltip title='Coming soon'>
                    <FormControlLabel control={<Switch disabled />} label='On-Chain'/>
                  </Tooltip>
                </FormGroup>
              </Grid>
              {/* Do not disturb flow */}
              <Grid item xs={12}>
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
                  value={start}
                  onChange={(e) => isHex(e.target.value) && setStart(e.target.value)}
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
                  value={end}
                  onChange={(e) => isHex(e.target.value) && setEnd(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Tooltip title={isGenerateAvailable()} disableHoverListener={isGenerateAvailable() === true}>
                <span>
                  <Button 
                    variant='contained'
                    color='primary'
                    disabled={isGenerateAvailable() !== true}
                    onClick={onGenerateClick}>
                    Generate
                  </Button>
                </span>
              </Tooltip>
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
