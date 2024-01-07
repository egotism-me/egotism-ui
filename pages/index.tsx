import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Box, Button, Card, CardActions, CardContent, Container, Typography, TextField, Grid, Switch, FormGroup, FormControlLabel, Tooltip, Paper, IconButton } from '@mui/material';
import Image from 'next/image';
import Logo from '../public/images/egotism.svg';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { wrap } from 'comlink';
import { MinerResult, MinerWorker } from '../lib/miner.worker';
import { LinearProgressWithLabel } from '../components/LinearProgressWithLabel';
import { estimateSuccessProbability } from '../lib/estimateSuccessProbability';
import { AddressConstraints } from '../lib/validateAddress';
import { Download } from '@mui/icons-material';

const isHex = (s: string): boolean => {
  return /^[0-9A-Fa-f]*$/.test(s);
}

const Home: NextPage = () => {
  const theme = useTheme();

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationAttempts, setGenerationAttempts] = useState(0n); 
  const [constraints, setConstraints] = useState<AddressConstraints>();
  const [generationResult, setGenerationResult] = useState<MinerResult>();

  const [displayPrivateKey, setDisplayPrivateKey] = useState(false);

  const isGenerateAvailable = (): true | string => {
    if (isGenerating) {
      return 'Generating...'
    }
    if (start.length === 0 && end.length === 0) {
      return 'Fields are empty';
    }
    if (!isHex(start) || !isHex(end)) {
      return 'Fields are not hex';
    }

    return true;
  }

  const onGenerateClick = async () => {
    setGenerationAttempts(0n);
    setIsGenerating(true);
    const constraints = {
      startsWith: start,
      endsWith: end
    };
    setConstraints(constraints);

    const workers = Array(4).fill(null).map(() => {
      const worker = wrap<MinerWorker>(new Worker(new URL('../lib/miner.worker.ts', import.meta.url)));
      const task = worker.runMiner(constraints);

      return {
        worker,
        task
      }
    });

    const interval = setInterval(async () => {
      let times = 0n;
      for (const { worker } of workers) {
        times += await worker.times;
      }

      setGenerationAttempts(times);
    }, 100);

    const result = await Promise.any(workers.map(x => x.task));
    clearInterval(interval);

    setGenerationResult(result);
    setIsGenerating(false);
  }

  const handleDownload = () => {
    if (!generationResult) {
      return;
    }
    const blob = new Blob([generationResult.privateKey], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'egotism.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  };

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
      <Container style={{minHeight: '85vh'}}>
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
              { isGenerating && <Grid item xs={12} justifyContent='center'>
                <Box px='10%'>
                  <LinearProgressWithLabel value={estimateSuccessProbability(constraints as AddressConstraints, generationAttempts) * 100}/>
                </Box>
              </Grid>}
              { generationResult && <Grid item xs={12}>
                <Paper elevation={4} sx={{ margin: theme.spacing(2), padding: theme.spacing(2)}}>
                  <Typography variant='body1' fontFamily='monospace' sx={{ wordBreak: 'break-all' }}>
                    Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{color: theme.palette.text.disabled}}>
                      {generationResult.address}
                    </span> <br/>
                    Private Key:&nbsp;
                    <span style={{color: theme.palette.text.disabled}}>
                      {displayPrivateKey
                        ? generationResult.privateKey 
                        : '•'.repeat(generationResult.privateKey.length)
                      }
                    </span>
                  </Typography>
                  <Button onClick={() => navigator.clipboard.writeText(generationResult.privateKey)}>
                    Copy
                  </Button>
                  <Button onClick={() => setDisplayPrivateKey(!displayPrivateKey)}>
                    {displayPrivateKey ? 'Hide' : 'Show'}
                  </Button>
                  <IconButton onClick={handleDownload} aria-label='download' sx={{ color: theme.palette.primary.main }}>
                    <Download />
                  </IconButton>
                </Paper>
              </Grid>}
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
          pt={theme.spacing(2)}
          color={theme.palette.text.disabled}>
          As of now, only local generation mode is avaialable.
        </Typography>
      </Container>
    </Layout>
  );
};

export default Home;
