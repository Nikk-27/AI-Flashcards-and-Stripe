'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import Head from 'next/head';
import { School, FlashOn, Devices } from '@mui/icons-material';

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
    method: 'POST',
    headers: {
      origin: 'http://localhost:3000',
    },
    })
    const checkoutSessionJson = await checkoutSession.json()
      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message)
        return
      }

      const stripe = await getStripe()
      const {error} = await stripe.redirectToCheckout({
        sessionId : checkoutSessionJson.id
      })

      if (error) {
        console.warn(error.message)
      }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Box>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </Box>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: 'center',
          my: 4,
          //backgroundImage: 'url(btn.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 10,
          color: 'black',
        }}
      >
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h6" gutterBottom>
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, '&:hover': { backgroundColor: 'secondary.main' } }}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <School color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FlashOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Devices color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              Access your Flashcards from any device, at any time, anywhere. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center', py: 4, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>Ready to Get Started?</Typography>
        <Button variant="contained" color="secondary" size="large" gutterBottom>
          Create Your First Flashcard
        </Button>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 3,
              border: '1px solid', 
              borderColor: 'grey.300',
              borderRadius: 2,
              boxShadow: 3,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5/Month</Typography>
              <Typography variant="h6" gutterBottom>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 3,
              border: '1px solid', 
              borderColor: 'grey.300',
              borderRadius: 2,
              boxShadow: 3,
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10/Month</Typography>
              <Typography variant="h6" gutterBottom>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ py: 4, textAlign: 'center', backgroundColor: 'grey.900', color: 'white' }}>
        <Typography variant="body2">© 2024 Flashcard SaaS. All rights reserved.</Typography>
        <Box sx={{ mt: 2 }}>
          {/* Add social media icons or links here */}
        </Box>
      </Box>
    </Container>
  );
}
