import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs"; // Import the SignIn component from Clerk

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in" passHref>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Typography variant="h4">Sign In</Typography>
        <SignIn /> {/* Use the SignIn component from Clerk */}
      </Box>
    </Container>
  );
}
