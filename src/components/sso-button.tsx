import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { Button } from "react-native";

export default function SSOButton() {
  const handleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    router.replace("/");
  };
  return <Button title='Continue with GitHub' onPress={handleSignIn} />;
}
