import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Container, AppBar, Toolbar, Typography, Button} from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
      <Container maxWidth="lg">
          <Head>
              <title>Flashcard SaaS</title>
              <meta name="description" content="Create flashcards from your text" />
          </Head>
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="h6">Flashcard SaaS</Typography>
                  <SignedOut>
                    <Button> Login</Button>
                    <Button> Sign Up</Button>
                  </SignedOut>
                  <SignedIn>
                    <UserButton></UserButton>
                  </SignedIn>
              </Toolbar>
          </AppBar>
      </Container>
  );
}
