import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function App() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      const token = await getToken();
      console.log("Sending token to backend");
      await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    if (isSignedIn) {
      syncUser();
    }
  }, [isSignedIn]);

  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default App;
