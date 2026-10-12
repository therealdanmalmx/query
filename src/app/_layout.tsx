import SSOButton from "@/components/sso-button";
import { authClient } from "@/lib/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Text } from "react-native";
import UseQueryFocus from "../hooks/use-query-focus";

const client = new QueryClient();

export default function RootLayout() {
  UseQueryFocus();
  return (
    <QueryClientProvider client={client}>
      <Stack
        screenOptions={{
          title: "Blog",
          headerRight: () => {
            {
              const session = authClient.useSession();
              if (session.data) {
                return <Text>😁</Text>;
              }
              return <SSOButton />;
            }
          },
        }}
      />
    </QueryClientProvider>
  );
}
