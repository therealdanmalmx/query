import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";

export default function SSOButton() {
  // const inFlight = useRef(false);
  // const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    // if (inFlight.current) return; // block double taps
    // inFlight.current = true;
    // setLoading(true);

    try {
      // Close any stale browser/auth session left over from before (iOS)
      try {
        WebBrowser.dismissAuthSession();
      } catch {}
      try {
        await WebBrowser.dismissBrowser();
      } catch {}

      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        console.error(error);
        return;
      }
      router.replace("/");
    } catch (e) {
      // Catches the WebBrowserAlreadyOpenException instead of crashing
      console.warn("Sign-in failed", e);
    } finally {
      // inFlight.current = false;
      // setLoading(false);
    }
  };

  return <Button title={"Sign In"} onPress={handleSignIn} />;
}
