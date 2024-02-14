import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Box, Divider, Typography } from '@mui/material';
import InlineCode from '../components/InlineCode';
import AboutDiagram from '../public/images/aboutDiagramDark.svg';

const About: NextPage = () => {
  return (
    <Layout useContainer={true}>
      <Box my={4}>
        <Box
          sx={{
            width: '100%', 
            height: 300, 
            backgroundImage: 'url(images/egotism.svg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px',
            backgroundPosition: '50px 50px',
            outlineColor: 'limegreen',
            outlineWidth: '4px',
            outlineStyle: 'solid'
          }} />
        <Typography variant='h2' component='h1' gutterBottom fontFamily='ui-serif' sx={{ color: 'limegreen' }}>
          About Egotism
        </Typography>
        <Divider /> 
        <Typography variant='h4' style={{ fontWeight: 'bold', marginTop: '16px' }}>
          What is Egotism?
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Egotism is a groundbreaking, decentralized protocol set to revolutionize the way users acquire vanity wallet addresses. With Egotism, the cumbersome process of generating personalized blockchain addresses is transformed into a seamless, efficient, and accessible experience. By using Egotism, you can utilize the vast computing power of the protocol to get vanity addresses tailored to your preferences without the need for elaborate setups or specialized hardware.        
        </Typography>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          How does it work?
        </Typography>
        <Typography variant="body1" paragraph>
          Egotism works on a bounty system. A <InlineCode>poster</InlineCode> posts a bounty specifying their needs, and offers a reward to whom completes the bounty first. The bounty can be fulfilled by anyone and people who actively work on newly submitted bounties are known as <InlineCode>miners</InlineCode>.
        </Typography>
        <Typography variant="body1" paragraph>
          In order to ensure that only the <InlineCode>poster</InlineCode> has access to the vanity address, Egotism uses ECC (Eliptic Curve Cryptography). Whenever a <InlineCode>poster</InlineCode> posts a bounty, they attach a <InlineCode>nonce</InlineCode> value - a point on an elliptic curve - which only they know of its underlying scalar value. Whenever a <InlineCode>miner</InlineCode> fulfills a bounty it means they have found a value that when the <InlineCode>nonce</InlineCode> is multiplied by it, the resulting point is the public key of the vanity address. Then, the poster can salvage the private key by multiplying the underlying scalar of the <InlineCode>nonce</InlineCode> by the value given from the <InlineCode>miner</InlineCode>.
        </Typography>
        <Box sx={{ position: 'relative', height: 800, marginY: 10}}>
          <Image fill={true} src={AboutDiagram} alt="How it works diagram" />
        </Box>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          When Will Egotism be Avialable?
        </Typography>
        <Typography variant="body1" paragraph>
          Estimation: April-May 2024
        </Typography>
      </Box>
    </Layout>
  );
};

export default About;
