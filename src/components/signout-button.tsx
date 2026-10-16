import { authClient } from "@/lib/auth-client";
import { Button } from "react-native";

export default function SignOutButton() {
  const handleSignOut = async () => {
    return authClient.signOut();
  };

  return <Button title={"🧛"} onPress={handleSignOut} />;
}
